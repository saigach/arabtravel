/*!
 * WEB API Auth service
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

const worker = http.createServer( (request, response) => {
	let time = process.hrtime()
	const getDuration = () => ( diff => (diff[0] * 1e9 + diff[1]) )( process.hrtime(time) )

	let host = request.headers.host

	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () =>
		new Promise( (resolve, reject) => {

			let command = url.parse(request.url, false, false).pathname
																.split(/\/+/)
																.filter(value => !!value)
																.map(value => value.toLowerCase())
																.shift() || null

			let sessionId = request.headers['cookie'] &&
							request.headers['cookie'].match(/session_id\s*=\s*([a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})/i)
			sessionId = sessionId && sessionId[1] || null

			switch (command) {
				case 'check-auth':
					if (!sessionId)
						return resolve({ code: 401 })

					return db.query(`SELECT sessions.id FROM sessions INNER JOIN users ON sessions.userid = users.id WHERE users.enable AND sessions.id = '${sessionId}'`).then(rows => {
						if (rows.length > 0)
							return resolve({ code: 200 })
						return resolve({ code: 401 })
					}).catch(reject)

				case 'login':

					try {
						body = body && JSON.parse(body) || {}
					} catch (error) {
						return resolve({
							code: 400,
							data: 'Request body parse error'
						})
					}

					if (request.method.toUpperCase() !== 'POST')
						return resolve({
							code: 405,
							data: `Method "${method}" isn't allowed`
						})

					if (!body.email || !/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/i.test(body.email))
						return resolve({
							code: 400,
							data: 'Wrong email value'
						})
					let email = body.email.toLowerCase()

					if (!body.password)
						return resolve({
							code: 400,
							data: 'Wrong password value'
						})
					let password = body.password
										.replace(/\\/g, "\\\\")
										.replace(/'/g, "\\'")

					return db.query(`SELECT id FROM users WHERE enable AND email='${email}' AND password = encode(digest('${password}', 'sha512'), 'hex')`).then(rows => {

						if (rows.length !== 1)
							return resolve({
								code: 403,
								sessionId: null,
								data: 'Email or password incorrect'
							})

						let userId = rows[0].id
						let ip = request.headers['x-real-ip'] || request.connection.remoteAddress || null

						return db.query(`INSERT INTO sessions (userid, ip) VALUES ('${userId}', ` + (ip ? `'${ip}'` : 'NULL') + `) RETURNING id, timezone('UTC', NOW() + (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,${DEFAULT_SESSION_DURATION})::text||' seconds')::interval) AS expires`).then(rows => {
							return resolve({
								code: 200,
								sessionId: rows[0].id,
								expires: new Date(rows[0].expires).toUTCString(),
								data: 'success'
							})
						})
					}).catch(reject)

				case 'logout':
					if (!sessionId)
						return resolve({
							code: 303,
							sessionId: null,
							location: '/'
						})

					return db.query(`DELETE FROM sessions WHERE id = '${sessionId}'`).then(rows => {
						resolve({
							code: 303,
							sessionId: null,
							location: '/'
						})
					}).catch(reject)

				default:
					return resolve({
						code: 400,
						data: `Bad Request`
					})
			}
		}).catch( error => {

			// === Engine error
			console.error(`Internal auth engine error: ${error}`)

			return {
				code: 500,
				data: 'Internal Service Engine Error'
			}
		}).then( responseData => {

			if (responseData.sessionId && responseData.expires)
				response.setHeader('Set-Cookie', `session_id=${responseData.sessionId}; Domain=${host}; Path=/; Expires=${responseData.expires}`)
			else if (responseData.sessionId === null)
				response.setHeader('Set-Cookie', `session_id=deleted; Domain=${host}; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)

			if (responseData.location)
				response.setHeader('Location', responseData.location)

			response.writeHead(responseData.code, {
				'Content-Type': 'text/html; charset=utf-8',
				'X-Page-Generation-Time': getDuration()
			})
			response.end(responseData.data || undefined)
		})
	)
})

worker.on('clientError', (error, socket) => {
	console.error(`Web client error: ${error}`)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

worker.listen(8099, '::')
