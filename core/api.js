/**
 * WEB API Claster worket
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const http = require('http')
const url = require('url')

const fs = require('fs')
const path = require('path')

const DB = new (require('./db.js'))()
const Session = require('./session.js')

const APIEngineDirectory = path.resolve(process.cwd(), 'core/api/')
const APIEngine = fs.readdirSync(APIEngineDirectory).reduce( (prev, file) => {
	let match = file.match(/([\w\-]+)\.js$/i)
	if (match)
		prev[match[1].toLowerCase()] = new ( require(path.resolve(APIEngineDirectory, file)) )(DB)
	return prev
}, {})

const getDuration = diff => diff[0] * 1e9 + diff[1]
const worker = http.createServer( (request, response) => {
	let time = process.hrtime()
	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () =>
		new Session(request, body).get.then(session => {

			if (!session.user)
				return session.set({ code: 401, data: { error: 'Unauthorized' } })

			let apiEngine = session.request.path.shift()
			if(!apiEngine || !APIEngine[apiEngine] || !APIEngine[apiEngine].api)
				return session.set({ code: 400, data: { error: 'Unknown API engine' } })

			if (session.request.method === 'OPTIONS')
				return session.set({ code: 200 })

			if (!['GET', 'POST', 'DELETE'].includes(session.request.method))
				return session.set({ code: 405, data: { error: 'Method not allowed'} })

			if (APIEngine[apiEngine].api instanceof Function)
				return APIEngine[apiEngine].api({
					request: session.request,
					session: session.data,
					user: session.user
				}).then(response => session.set(response))

			return session.set({ code: 200, data: APIEngine[apiEngine].api })

		}).then(session => {

			if (session.response.type)
				response.setHeader('Content-Type', session.response.type)

			if (session.response.location)
				response.setHeader('Location', session.response.location)

			if (session.id && session.expires)
				response.setHeader('Set-Cookie', `session_id=${session.id}; Domain=${session.host}; Path=/; Expires=${session.expires}`)
			else if (session.id === null)
				response.setHeader('Set-Cookie', `session_id=deleted; Domain=${session.host}; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)

			response.writeHead(session.response.code || 200, { 'X-Engine-Time': getDuration(process.hrtime(time)) })
			response.end(session.response.data || undefined)

		}).catch( errorData => {
			let code = errorData.code || `${Number(new Date())}-${Math.floor(Math.random() * 10001)}`
			if (/APPLICATION_POLICY/.test(String(errorData))) {
				response.writeHead(403, {
					'Content-Type': 'text/html; charset=utf-8',
					'X-Engine-Time': getDuration(process.hrtime(time)),
					'X-Engine-Error': code
				})
				response.end('Forbidden')
				return
			}

			console.dir(errorData)

			console.error(`Error [${code}]: ${errorData}`)
			response.writeHead(500, {
				'Content-Type': 'text/html; charset=utf-8',
				'X-Engine-Time': getDuration(process.hrtime(time)),
				'X-Engine-Error': code
			})
			response.end('Internal service engine error')
		})
	)
})

worker.on('clientError', (error, socket) => {
	console.error(`Web client error: ${error}`)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

const servicePort = Number.parseInt(process.argv[2])
worker.listen(servicePort, '::')
console.log(`Worker listening [::]:${servicePort}`)
