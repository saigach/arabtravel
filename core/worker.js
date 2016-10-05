/*!
 * WEB Worker service
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
process.env.TZ = 'UTC'

const http = require('http')
const url = require('url')
const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

// Worker config
const Config = require('./config.js')
const config = new Config()

// Data base engine
const DB = require('./db.js')
const db = new DB(`host=${config.db.host} port=${config.db.port} dbname=${config.db.dbname} user=${config.db.user} password=${config.db.password} connect_timeout=${config.db.timeout}`)

// UUIDv1
const uuid = require('./uuid.js')

const worker = http.createServer( (request, response) => {
	const time = process.hrtime()
	const getDuration = () => ( diff => (diff[0] * 1e9 + diff[1]) )( process.hrtime(time) )

	let body = ''
	request.on('data', chunk => body += String(chunk) )
	request.on('end', () => {

	})
})

worker.on('clientError', (error, socket) => {
	console.error(error)
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

worker.listen(8080, '::')
