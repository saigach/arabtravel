/**
 * WEB API Claster worket
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const http = require('http')
const url = require('url')
const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

// Read app config
const Config = require('./config.js')
const config = new Config()

// Data base engine
const DB = require('./db.js')
const db = new DB(`host=${config.db.host} port=${config.db.port} dbname=${config.db.dbname} user=${config.db.user} password=${config.db.password} connect_timeout=${config.db.timeout}`)

// UUIDv1
const uuid = require('./uuid.js')

const adminModelDirectory = path.resolve(config.directory, 'admin/app/models/')
const models = fs.readdirSync(adminModelDirectory).reduce( (prev, file) => {
	let match = file.match(/([\w\-]+)\.js$/i)
	if (match)
		prev[match[1].toLowerCase()] = {}
		// prev[match[1].toLowerCase()] = require(path.resolve(adminModelDirectory, file))
	return prev
}, {})

const worker = http.createServer( (request, response) => {
	const time = process.hrtime()
	const getDuration = () => ( diff => (diff[0] * 1e9 + diff[1]) )( process.hrtime(time) )

	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () => {

		// Request url data
		let urlData = url.parse(request.url, true, true)

		// Create new session
		let session = {
			request: {
				body: body && JSON.parse(body) || {},
				query: urlData.query,
				method: request.method.toUpperCase()
			},
			ip: request.headers['x-real-ip'] || request.connection.remoteAddress || null,
			host: request.headers.host
		}

		// Parse path
		session.request.path = urlData.pathname
							.split(/\/+/)
							.filter(value => !!value)
							.map(value => value.toLowerCase())

		// Session id
		let sessionId = request.headers['cookie'] &&
						request.headers['cookie'].match(/session_id\s*=\s*([0-9a-f\-]+)/i) ||
						null
		session.id = sessionId && uuid.test(sessionId[1]) && sessionId[1] || uuid.get()

		new Promise( (resolve, reject) => {

			// === Load session variables
			db.query(`SELECT id, data FROM sessions WHERE id='${session.id}' AND ts > NOW() - INTERVAL '3 day' LIMIT 1`)
			.then( rows => {
				session.data = rows[0] && rows[0].data || {}
				session.user = {}
				resolve(session)
			}).catch(reject)

		}).then( session => {

			// Request module name
			let modelName = session.request.path.shift() || null
			if(!modelName || !(modelName in models)) {
				session.responseCode = 400
				session.data = { error: 'Invalid Model'}
				return session
			}

			// Request item id
			let id = session.request.path.shift() || null
			if (id && !uuid.test(id)) {
				session.responseCode = 400
				session.data = { error: 'ID is not valid UUIDv1'}
				return session
			}

			switch (session.request.method) {
				case 'GET':
					return new Promise( (resolve, reject) =>
						db.query(`SELECT id, data FROM objects WHERE NOT deleted AND model = '${modelName}'` + (id?` AND id='${id}'`:''), true ).then(rows => {

							if (id) {
								session.responseCode = 200
								session.data = { __id: id }

								if (rows.length === 1) {
									session.data = rows[0].data
									session.data.__id = rows[0].id
								}
								return resolve(session)
							}

							session.responseCode = 200
							session.data = rows.map(value => Object.assign(value.data, { __id: value.id }))
							return resolve(session)
						}).catch(reject)
					)
				case 'POST':
				case 'PUT':

					if (!session.request.body) {
						session.responseCode = 400
						session.data = { error: 'Invalid request object'}
						return session
					}

					return new Promise( (resolve, reject) => {
						let data = session.request.body
						if (data.__id !== undefined)
							delete data.__id
						data = JSON.stringify(data)

						db.query(`INSERT INTO objects (model, id, data) VALUES ('${modelName}', '${id}', '${data}') ON CONFLICT (id) DO UPDATE SET data = '${data}', model = '${modelName}' RETURNING id, data`).then(rows => {
							session.data = rows[0].data
							session.data.__id = rows[0].id
							resolve(session)
						}).catch(reject)
					})
				case 'DELETE':
					if (!id) {
						session.responseCode = 400
						session.data = { error: 'ID is not set'}
						return session
					}
					return new Promise( (resolve, reject) =>
						db.query(`UPDATE objects SET deleted = TRUE WHERE model = '${modelName}' AND id='${id}'`, true).then(rows => {
							session.responseCode = 200
							session.data = {
								sucess: 'deleted',
								__id: id
							}
							resolve(session)
						}).catch(reject)
					)
				case 'OPTIONS':
					session.responseCode = 200
					session.data = null
					return session
				default:
					session.responseCode = 405
					session.data = { error: 'Method Not Allowed'}
					return session
			}

		}).then( session => {
			// === Save session variables
			if (!uuid.test(session.id))
				session.id = uuid.get()

			let json = JSON.stringify(session.data || {})
			return new Promise( (resolve, reject) => {
				db.query(`INSERT INTO sessions (id, data, ip) VALUES ('${session.id}', '${json}', ` + (session.ip?`'${session.ip}'`:'NULL') +`) ON CONFLICT (id) DO UPDATE SET data = '${json}', ip = '${session.ip}'`)
				.then( () => resolve(session) ).catch(reject)
			})

		}).then( session => {

			// === Convert session to responseData

			const responseData = {
				code: session.responseCode || 200,
				sessionId: session.id,
				gzip: false
			}

			if (session.binary) {
				responseData.data = session.binary.data
				responseData.type = session.binary.type || 'application/octet-stream'
				responseData.file = session.binary.name || null
				return responseData
			}

			if (session.data === undefined || session.data === null) {
				responseData.data = null
				responseData.type = null
				return responseData
			}

			responseData.data = JSON.stringify(session.data)
			responseData.type = 'application/json; charset=utf-8'

			if (!config.gzip)
				return responseData

			return new Promise( (resolve, reject) =>
				zlib.gzip(new Buffer(responseData.data, 'utf-8'), (error, gziped) => {
					if (error)
						return reject(error)

					responseData.data = gziped
					responseData.gzip = true
					resolve(responseData)
				})
			)

		}).catch( error => {

			// === Response error
			console.error(error)

			return {
				code: 500,
				type: 'text/html; charset=utf-8',
				data: 'Internal Service Engine Error'
			}

		}).then( responseData => {

			if (responseData.type)
				response.setHeader('Content-Type', responseData.type)

			if (responseData.gzip)
				response.setHeader('Content-Encoding', 'gzip')

			if (responseData.file)
				response.setHeader('Content-Disposition', `inline; filename=${responseData.file}`)

			if (responseData.sessionId) {
				const expires = new Date()
				expires.setSeconds(expires.getSeconds() + 259200)
				response.setHeader('Set-Cookie', `session_id=${responseData.sessionId}; Domain=${session.host}; Path=/; Expires=${expires.toUTCString()}`)
			}

			response.writeHead(responseData.code, {
				'Access-Control-Allow-Headers': 'origin, content-type, accept',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, DELETE',
				'X-Page-Generation-Time': getDuration()
			})
			response.end(responseData.data)

		})
	})
})

worker.on('clientError', (error, socket) => {
	console.error(error)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

worker.listen(8090, '::')
