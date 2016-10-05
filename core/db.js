/*!
 * DB engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const Client = require('pg-native')

module.exports = class DB {
	constructor(connectionString = '', shrinkTimeout = 600) {
		this.connectionString = connectionString
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
				client.end( error => console.error(error) )
		}
	}

	query(SQL) {

		if (typeof SQL !== 'string')
			throw new TypeError('SQL query must be a string')

		return new Promise( (resolve, reject) => {

			let client = this.pool.pop()

			if (!client)
				client = new Client()

			if (client.pq.connected)
				return resolve(client)

			client.connect(this.connectionString, error => {
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

