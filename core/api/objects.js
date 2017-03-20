/*!
 * API Objrcts engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const customQueryList = {
	trip: `objects.data->'type' AS "type", objects.data->'pointA' AS "pointA", objects.data->'pointB' AS "pointB", objects.data->'description' AS "description"`,
	package: `objects.data->'pointA' AS "pointA", objects.data->'pointB' AS "pointB", objects.data->'duration' AS "duration"`,
	order: `objects.data->'hrid' AS "hrid", objects.data->'type' AS "type", objects.data->'date' AS "date"`,
	static: `objects.data->'url' AS "url"`
}

const escapeStr = str => "'" + String(str).replace(/'/g, "\\'") + "'"

module.exports = class APIProject {
	constructor(DB) {
		this.DB = DB
		this.DB.query(`SELECT unnest(enum_range(NULL::models)) AS model`).then(rows =>
			this.models = rows.reduce( (prev, value) => prev.concat(value.model), [] )
		)
	}

	api(requestData) {
		let method = requestData.request.method

		let model = requestData.request.path.shift()
		if (!model || !this.models.includes(model))
			return Promise.resolve({
				code: 400,
				data: { error: 'Wrong model name'}
			})

		let data = requestData.request.body || undefined

		let id = requestData.request.path.shift() || data && data.__id || null
		if (id && !/^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))
			return Promise.resolve({
				code: 400,
				data: { error: 'ID is not valid UUIDv1'}
			})

		if (data && data.id)
			delete data.id

		switch (method) {
			case 'GET':

				if (!id) {
					let customQuery = customQueryList[model] && `, ${customQueryList[model]}` || ''
					return this.DB.query(`
						SELECT
							objects.id,
							objects.enable,
							objects.title,
							json_build_object('id',users.id, 'title',users.title, 'email',users.email, 'phone',users.phone) AS owner
							${customQuery}
						FROM objects
						LEFT JOIN users ON objects.owner = users.id
						WHERE model = '${model}'
					`).then(rows => ({
						code: 200,
						data: rows
					}))
				}

				return this.DB.query(`
					SELECT
						objects.id,
						objects.enable,
						objects.title,
						objects.data,
						json_build_object('id',users.id, 'title',users.title, 'email',users.email, 'phone',users.phone) AS owner
					FROM objects
					LEFT JOIN users ON objects.owner = users.id
					WHERE
						objects.model = '${model}'
						AND
						objects.id = '${id}'
				`).then(rows => {
					if (rows.length !== 1)
						return {
							code: 404,
							data: { error: `Object "${id}"" not found`}
						}

					return {
						code: 200,
						data: Object.assign({}, rows[0].data || {}, rows[0], { data: null })
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
							WHERE
								model = '${model}'
								AND
								id = ${id}
							RETURNING enable
						`).then( rows => ({
							code: 200,
							data: rows[0]
						}))
					default:
						if (data.owner !== undefined)
							delete data.owner

						if (data.id !== undefined)
							delete data.id

						let enable = true
						if (data.enable !== undefined) {
							enable = !!data.enable
							delete data.enable
						}
						enable = enable && 'TRUE' || 'FALSE'

						let title = {}
						if (data.title !== undefined) {
							title = data.title
							delete data.title
						}
						title = escapeStr(JSON.stringify(title || {}))

					 	data = escapeStr(JSON.stringify(data || {}))

						return this.DB.query(`
							INSERT INTO objects (
								model,      id,    enable,    title,    data
							) VALUES (
								'${model}', ${id}, ${enable}, ${title}, ${data}
							) ON CONFLICT (id) DO UPDATE SET
								enable = ${enable},
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
							data: Object.assign({}, rows[0].data || {}, rows[0], { data: null })
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
					WHERE
						model = '${model}'
						AND
						id='${id}'
				`).then(rows => ({
					code: 200,
					data: { sucess: 'deleted', id: id }
				}))
		}
	}
}
