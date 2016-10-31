/*!
 * WEB Auth service
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const http = require('http')
const DB = new (require('./db.js'))()

const worker = http.createServer( (request, response) =>
	new Promise( (resolve, reject) => {
		let sessionId = request.headers['cookie'] &&
						request.headers['cookie'].match(/session_id\s*=\s*([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i)
		sessionId = sessionId && sessionId[1] || null

		if (!sessionId)
			return resolve(401)

		return DB.query(`SELECT sessions.id FROM sessions INNER JOIN users ON sessions.owner = users.id WHERE users.enable AND sessions.id = '${sessionId}'`).then(rows => {
			if (rows.length > 0)
				return resolve(200)
			return resolve(401)
		}).catch(reject)

	}).catch( error => {
		console.error(`Error [0]: ${error}`)
		return 500
	}).then( responseCode => {
		response.writeHead(responseCode)
		response.end()
	})
)

worker.on('clientError', (error, socket) => {
	console.error(`Web client error: ${error}`)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

const servicePort = Number.parseInt(process.argv[2])
worker.listen(servicePort, '::')
console.log(`Worker listening [::]:${servicePort}`)
