/**
 * WEB API Claster worket
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const DEFAULT_SESSION_DURATION = 86400

const http = require('http')
const url = require('url')

const fs = require('fs')
const path = require('path')

// Read DB config
const dbConfig = JSON.parse(
	fs.readFileSync(
		path.resolve(process.cwd(), 'db.config.json'),
		'utf8'
	)
)

// Data base engine
const DB = require('./db.js')
const db = new DB(`host=${dbConfig.host} port=${dbConfig.port} dbname=${dbConfig.dbname} user=${dbConfig.user} password=${dbConfig.password} connect_timeout=${dbConfig.timeout}`)

const APIEngineDirectory = path.resolve(process.cwd(), 'core/api/')
const APIEngine = fs.readdirSync(APIEngineDirectory).reduce( (prev, file) => {
	let match = file.match(/([\w\-]+)\.js$/i)
	if (match)
		prev[match[1].toLowerCase()] = new ( require(path.resolve(APIEngineDirectory, file)) )(db)
	return prev
}, {})

const worker = http.createServer( (request, response) => {
	let time = process.hrtime()
	const getDuration = () => ( diff => (diff[0] * 1e9 + diff[1]) )( process.hrtime(time) )

	let host = request.headers.host
	let ip = request.headers['x-real-ip'] || request.connection.remoteAddress || null
	let requestUrl = url.parse(request.url, false, false)

	let sessionId = request.headers['cookie'] &&
					request.headers['cookie'].match(/session_id\s*=\s*([a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})/i)
	sessionId = sessionId && sessionId[1] || null

	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () =>
		new Promise( (resolve, reject) => {

			if (!sessionId)
				return reject({
					code: 401,
					data: { error: 'Unauthorized' }
				})

			let requestPath = requestUrl.pathname
										.split(/\/+/)
										.filter(value => !!value)
										.map(value => value.toLowerCase())

			let apiEngine = requestPath.shift()
			if(!apiEngine && !APIEngine[apiEngine] && !APIEngine[apiEngine].api)
				return reject({
					code: 400,
					data: { error: 'Unknown API engine' }
				})

			try {
				body = body && JSON.parse(body) || {}
			} catch (error) {
				return reject({
					code: 400,
					data: { error: 'Request body parse error' }
				})
			}

			resolve({
				method: request.method.toUpperCase(),
				engine: apiEngine,
				path: requestPath,
				body: body
			})
		}).then( requestData =>
			db.query(`SELECT sessions.data AS session, users.id AS userid, users.roles AS roles, users.data AS data FROM sessions INNER JOIN users ON sessions.userid = users.id WHERE users.enable AND sessions.id = '${sessionId}' LIMIT 1`).then( rows => {

				if (rows.length !== 1)
					return Promise.reject({
						code: 401,
						data: { error: 'Unauthorized' }
					})

				requestData.session = rows[0].session
				requestData.user = {
					id: rows[0].userid,
					roles: rows[0].roles,
					data: rows[0].data
				}
				return requestData
			})
		).then( requestData => {
			if (requestData.method === 'OPTIONS')
				return {
					code: 200,
					session: requestData.session,
					data: null
				}

			if (!['GET', 'POST', 'DELETE'].includes(requestData.method))
				return {
					code: 405,
					session: requestData.session,
					data: { error: 'Method not allowed'}
				}

			if (APIEngine[requestData.engine].api instanceof Function)
				return APIEngine[requestData.engine].api(requestData)

			return {
				code: 200,
				session: requestData.session,
				data: APIEngine[requestData.engine].api
			}
		}).then( responseData => {
			// Save session
			let json = JSON.stringify(typeof responseData.session === 'object' && responseData.session || {})
			return db.query(`UPDATE sessions SET data = '${json}', ip = ` + (ip?`'${ip}'`:'NULL') + ` WHERE id = '${sessionId}' RETURNING id, timezone('UTC', NOW() + (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,${DEFAULT_SESSION_DURATION})::text||' seconds')::interval) AS expires`).then(rows => {
				responseData.sessionId = rows[0].id
				responseData.expires = new Date(rows[0].expires).toUTCString()
				return responseData
			})
		}).catch( errorData => {
			if (errorData instanceof Error)
				console.error(errorData)

			return {
				code: errorData.code || 500,
				data: errorData.data || { error: 'Unknown service engine error' }
			}

			if (!errorData.code)
				errorData.code = 500

			if (!errorData.data)
				errorData.data = 'Internal service engine error'

			return errorData
		}).then( responseData => {
			if (responseData.sessionId && responseData.expires)
				response.setHeader('Set-Cookie', `session_id=${responseData.sessionId}; Domain=${host}; Path=/; Expires=${responseData.expires}`)
			else if (responseData.sessionId === null)
				response.setHeader('Set-Cookie', `session_id=deleted; Domain=${host}; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)

			response.writeHead(responseData.code || 200, {
				'Content-Type': 'application/json; charset=utf-8',
				'X-Page-Generation-Time': getDuration()
			})
			response.end(JSON.stringify(responseData.data || null))
		})
	)
})

worker.on('clientError', (error, socket) => {
	console.error(`Web client error: ${error}`)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

worker.listen(8090, '::')
