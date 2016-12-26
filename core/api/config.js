/*!
 * API Config engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const escapeStr = str => "'" + String(str).replace(/'/g, "\\'") + "'"

module.exports = class APIStatic {
	constructor(DB) {
		this.DB = DB
	}

	api(requestData) {
		let method = requestData.request.method

		switch (method) {
			case 'GET':
				return this.DB.query(`
					SELECT
						key,
						value
					FROM
						config
				`).then(rows => ({
					code: 200,
					data: rows.reduce( (prev, row) => Object.assign(prev, { [row.key]: row.value } ), {} )
				}))

			case 'POST':

				let data = requestData.request.body || undefined

				if (!data)
					return Promise.resolve({
						code: 400,
						data: { error: 'Invalid request object'}
					})

				let keys = Object.keys(data).filter( key => /^[A-Za-z][0-9A-Za-z]*$/.test(key))

				return Promise.all( keys.reduce( (prev, key) => {
					let value = escapeStr(JSON.stringify(data[key]))
					return prev.concat(this.DB.query(`
						INSERT INTO config (
							key,      value
						) VALUES (
							'${key}', ${value}
						) ON CONFLICT (key) DO UPDATE SET
							value = ${value}
						RETURNING
							key,
							value
					`).then( rows => rows.length > 0 ? { [rows[0].key]: rows[0].value } : {} ) )
				}, []) ).then( objs => ({
					code: 200,
					data: Object.assign.apply(undefined, objs)
				}) )
		}
	}
}
