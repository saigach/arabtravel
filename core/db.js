/*!
 * DB engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const fs = require('fs')
const path = require('path')

const Client = require('pg-native')

const dbConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'db.config.json'), 'utf8'))
const connectionString = `host=${dbConfig.host} port=${dbConfig.port} dbname=${dbConfig.dbname} user=${dbConfig.user} password=${dbConfig.password} connect_timeout=${dbConfig.timeout}`

const shrinkTimeout = 600

const DEBUG = !!process.env.WORKER_DEBUG

module.exports = class DB {
	constructor() {
		this.pool = []

		// Shrink pool size
		setInterval(
			() => this.reduceSize( Math.ceil( this.pool.length / 2 ) ),
			shrinkTimeout * 1000
		)
	}

	reduceSize(max = 1) {
		if (max < 1)
			max = 1
		while (this.pool.length > max) {
			let client = this.pool.pop()
			if (client)
				client.end( error => error && console.error(error) )
		}
	}

	query(SQL) {

		if (DEBUG)
			console.log(SQL)

		if (typeof SQL !== 'string')
			throw new TypeError('SQL query must be a string')

		return new Promise( (resolve, reject) => {

			let client = this.pool.pop()

			if (!client)
				client = new Client()

			if (client.pq.connected)
				return resolve(client)

			client.connect(connectionString, error => {
				if (error)
					return reject(error)
				resolve(client)
			})

		}).then(client => new Promise( (resolve, reject) =>
			client.query(SQL, (error, rows) => {
				this.pool.push(client)
				if (error)
					return reject(error)

				resolve(rows)
			})
		))
	}
}

