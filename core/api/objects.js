/*!
 * API Projects engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const translite = require('../translite.js')

const escapeStr = str => "'" + String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"

module.exports = class APIProject {
	constructor(DB) { this.DB = DB }

	api(requestData) {
		let method = requestData.request.method
		let data = requestData.request.body || undefined
		let id = requestData.request.path.shift() || data && data.__id || null

		if (id && !/^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))
			return Promise.resolve({
				code: 400,
				data: { error: 'ID is not valid UUIDv1'}
			})

		switch (method) {
			case 'GET':

				if (!id)
					return this.DB.query(`
						SELECT
							objects.id,
							objects.enable,
							objects.title,
							json_build_object('id',users.id, 'title',users.title) AS owner
						FROM objects
						LEFT JOIN users ON objects.owner = users.id
					`).then(rows => ({
						code: 200,
						data: rows
					}))

				return this.DB.query(`
					SELECT
						objects.*,
						json_build_object('id',users.id, 'title',users.title) AS owner
					FROM objects
					LEFT JOIN users ON objects.owner = users.id
					WHERE objects.id = '${id}'
				`).then(rows => {
					if (rows.length !== 1)
						return {
							code: 404,
							data: { error: `Project "${id}"" not found`}
						}
					return {
						code: 200,
						data: rows[0]
					}
				})

			case 'POST':
				if (!data)
					return Promise.resolve({
						code: 400,
						data: { error: 'Invalid request object'}
					})

				if (!id)
					return Promise.resolve({
						code: 400,
						data: { error: 'ID is empty'}
					})

				id = `'${id}'`

				let command = requestData.request.path.shift()

				switch (command) {
					case 'enable':
						return this.DB.query(`
							UPDATE objects
							SET enable = NOT enable
							WHERE id = ${id}
							RETURNING enable
						`).then( rows => ({
							code: 200,
							data: rows[0]
						}))
					default:
						let owner = "'" + requestData.user.id + "'"

						let enable = true
						if (data.enable !== undefined) {
							enable = !!data.enable
							delete data.enable
						}
						enable = enable && 'TRUE' || 'FALSE'

						let title = ''
						if (data.title !== undefined) {
							title = String(data.title).trim()
							delete data.title
						}
						title = escapeStr(title)

						let data = escapeStr(JSON.stringify(data || {}))

						return this.DB.query(`
							INSERT INTO objects (
								id,    enable,    owner,    title,    data
							) VALUES (
								${id}, ${enable}, ${owner}, ${title}, ${data}
							) ON CONFLICT (id) DO UPDATE SET
								enable = ${enable},
								owner = ${owner},
								title = ${title},
								data = ${data}
							RETURNING
								objects.*,
								(
									SELECT json_build_object('id',id, 'title',title)
									FROM users
									WHERE objects.owner = users.id
								) AS owner
						`).then( rows => ({
							code: 200,
							data: rows[0]
						}) )
				}

			case 'DELETE':
				if (!id)
					return Promise.resolve({
						code: 400,
						data: { error: 'ID is not set' }
					})
				return this.DB.query(`
					DELETE FROM objects
					WHERE id='${id}'
				`).then(rows => ({
					code: 200,
					data: { sucess: 'deleted', id: id }
				}))
		}
	}
}
