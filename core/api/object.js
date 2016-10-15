/*!
 * API Objects engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
const fs = require('fs')
const path = require('path')

const modelsDirectory = path.resolve(process.cwd(), 'admin/app/model/')

const buildObject = obj => Object.assign(obj.data, { __id: obj.id, __enable: obj.enable })

module.exports = class APIObjects {
	constructor(db) {
		this.db = db
		this.models = fs.readdirSync(modelsDirectory).reduce( (prev, file) => {
			let match = file.match(/([\w\-]+)\.js$/i)
			if (match)
				prev[match[1].toLowerCase()] = require(path.resolve(modelsDirectory, file))
			return prev
		}, {})
	}

	api(requestData) {

		let method = requestData.method
		let model = requestData.path.shift()

		if (!(model in this.models))
			return {
				code: 400,
				data: { error: 'Unknown data model'}
			}

		let data = requestData.body || undefined
		let id = requestData.path.shift() || data && data.__id || null

		if (id && !/^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))
			return {
				code: 400,
				data: { error: 'Object ID is not valid UUIDv1'}
			}

		switch (method) {
			case 'GET':
				return this.db.query(`SELECT id, enable, data FROM objects WHERE NOT deleted AND model = '${model}'` + (id?` AND id='${id}'`:'')).then(rows => {

					if (id) {
						if (rows.length !== 1)
							return {
								code: 404,
								data: { error: 'Object not found'}
							}
						return { data: buildObject(rows[0]) }
					}
					return { data: rows.map(value => buildObject(value)) }
				})

			case 'POST':
				if (!data)
					return {
						code: 400,
						data: { error: 'Invalid request object'}
					}

				id = id && `'${id}'` || 'DEFAULT'

				if (data.__id !== undefined)
					delete data.__id

				let enable = data.__enable ? 'TRUE' : 'FALSE'
				if (data.__enable !== undefined)
					delete data.__enable

				data = JSON.stringify(data).replace(/\\/g, "\\\\")
											.replace(/'/g, "\\'")

				return this.db.query(`INSERT INTO objects (model, id, enable, data) VALUES ('${model}', ${id}, ${enable}, '${data}') ON CONFLICT (id) DO UPDATE SET model = '${model}', enable = ${enable}, data = '${data}' RETURNING id, enable, data`).then( rows => ({ data:  buildObject(rows[0]) }) )

			case 'DELETE':
				if (!id)
					return {
						code: 400,
						data: { error: 'ID is not set' }
					}
				return this.db.query(`UPDATE objects SET deleted = TRUE WHERE model = '${model}' AND id='${id}'`).then(rows => ({
					data: { sucess: 'deleted', __id: id }
				}))
		}
	}
}
