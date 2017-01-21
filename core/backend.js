/*!
 * WEB Worker service
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const languages = ['en', 'ar']

const fs = require('fs')
const path = require('path')

const http = require('http')
const url = require('url')
const doT = require('dot')

const DB = new (require('./db.js'))()
const Session = require('./session.js')


const MLData = require('./mldata.js')

const Template = {}
const templateDirectory = path.resolve(process.cwd(), 'tpl/')
const reloadTemplate = (filename) => {
	if (!filename)
		return
	let match = filename.match(/([\w\-]+)\.tpl$/i)
	let name = match && match[1].toLowerCase() || null
	if (name) {
		fs.readFile(path.resolve(templateDirectory, filename), 'utf8', (error, data) => {
			if (error)
				return console.error(error)
			let tpl = data
						.replace(/\s*(?:\r|\n)\s*/g, '')
						.replace(/<\!\-\-.*?\-\->/g, '')
			Template[name] = doT.template(tpl)
			console.log(`Template "${name}" updated`)
		})
	}
}
fs.readdir(templateDirectory, (error, files) =>
	error && console.error(error) || files.forEach(filename => reloadTemplate(filename))
)
fs.watch(templateDirectory, (eventType, filename) => reloadTemplate(filename))

const engineDirectory = path.resolve(process.cwd(), 'core/engine/')
const Engine = fs.readdirSync(engineDirectory).reduce( (prev, file) => {
	let match = file.match(/([\w\-]+)\.js$/i)
	let name = match[1].toLowerCase()
	if (name)
		prev[name] = new ( require(path.resolve(engineDirectory, file)) )(DB, Template)
	return prev
}, {})

const rootEngine = new (require('./root.js'))(DB, Template)

const Static = new ( require('./static.js'))(DB, Template)

const getDuration = diff => diff[0] * 1e9 + diff[1]
const worker = http.createServer( (request, response) => {
	let time = process.hrtime()
	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () =>
		new Session(request, body, true).get.then(session => {

			let backendEngine = session.request.path.shift() || 'index'

			let requestData = {
				request: session.request,
				session: session.data,
				user: session.user
			}

			requestData.ml = MLData(requestData.request.language)

			if (backendEngine === 'api' && Engine['api'])
				return Engine['api']
						.engine(requestData)
						.then(response => session.set(response))

			return (Engine[backendEngine] ?
				Engine[backendEngine].engine(requestData) :
				Static.engine(backendEngine, requestData)
			).then(response => {
				if (response.data) {
					response.data.host = session.host
					return rootEngine.engine(requestData, response)
					.then(response => session.set(response))
				}
				return session.set(response)
			})

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

