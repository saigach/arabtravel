/*!
 * WEB Login service
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const http = require('http')
const url = require('url')

const DB = new (require('./db.js'))()
const Session = require('./session.js')

const getDuration = diff => diff[0] * 1e9 + diff[1]
const worker = http.createServer( (request, response) => {
	let time = process.hrtime()
	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () =>
		new Session(request, body).get.then(session => {

			switch (session.request.path.shift()) {
				case 'login':
					if (session.user)
						return session.set({ code: 200, data: { email: session.user.email || null } })

					if (session.request.method !== 'POST')
						return session.set({ code: 405, data: `Method "${session.request.method}" isn't allowed` })

					let email = String(session.request.body.email || '').toLowerCase()
					if (!/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/i.test(email))
						return session.set({ code: 400, data: 'Wrong email value' })

					if (!session.request.body.password)
						return session.set({ code: 400, data: 'Wrong password value' })
					let password = String(session.request.body.password).replace(/\\/g, "\\\\").replace(/'/g, "\\'")

					return DB.query(`SELECT email, id FROM users WHERE enable AND roles @> '{admin}' AND email='${email}' AND password = encode(digest('${password}', 'sha512'), 'hex')`).then(rows => {

						if (rows.length !== 1)
							return session.set({ code: 403, session: null, data: 'Email or password incorrect' })

						session.user = { id: rows[0].id }
						return session.set({ code: 200, data: { email: rows[0].email || null } })
					})
				case 'logout':
					return session.set({
						code: 303,
						user: null,
						location: '/'
					})
				default:
					return session.set({ code: 400, data: 'Bad Request' })
			}

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
