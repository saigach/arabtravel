/*!
 * API Static engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const escapeStr = str => "'" + String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"

module.exports = class APIStatic {
	constructor(DB) {
		this.DB = DB
	}

	api(requestData) {
		let method = requestData.request.method
		let data = requestData.request.body || undefined
		let id = requestData.request.path.shift() || data && data.__id || null

		if (id && !/^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))
			return Promise.resolve({
				code: 400,
				data: { error: 'Static page ID is not valid UUIDv1'}
			})

		switch (method) {
			case 'GET':
				if (!id)
					return this.DB.query(`
						SELECT
							static.id,
							static.enable,
							static.title,
							static.url
						FROM static
					`).then(rows => ({
						code: 200,
						data: rows
					}))

				return this.DB.query(`
						SELECT
							static.*
						FROM static
						WHERE static.id = '${id}'
				`).then(rows => {
					if (rows.length !== 1)
						return {
							code: 404,
							data: { error: `Static page "${id}"" not found`}
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
							UPDATE static
							SET enable = NOT enable
							WHERE id = ${id}
							RETURNING enable
						`).then( rows => ({
							code: 200,
							data: rows[0]
						}))
					default:
						let enable = true
						if (data.enable !== undefined)
							enable = !!data.enable
						enable = enable && 'TRUE' || 'FALSE'

						let title = ''
						if (data.title !== undefined)
							title = String(data.title).trim()
						title = escapeStr(title)

						let description = ''
						if (data.description !== undefined)
							description = String(data.description).trim()
						description = escapeStr(description)

						let content = ''
						if (data.content !== undefined)
							content = String(data.content)
						content = escapeStr(content)

						let image = null
						if (data.image !== undefined)
							image = data.image
						image = escapeStr(JSON.stringify(image))

						let url = ''
						if (data.url !== undefined)
							url = String(data.url).trim().toLowerCase()
						url = escapeStr( url.replace(/[^a-z0-9\-]+/,'') )

						return this.DB.query(`
							INSERT INTO static (
								id,    enable,    title,    description,    content,    image,    url
							) VALUES (
								${id}, ${enable}, ${title}, ${description}, ${content}, ${image}, ${url}
							) ON CONFLICT (id) DO UPDATE SET
								enable = ${enable},
								title = ${title},
								description = ${description},
								content = ${content},
								image = ${image},
								url = ${url}
							RETURNING
								static.*
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
					DELETE FROM static
					WHERE id='${id}'
				`).then(rows => ({
					code: 200,
					data: { sucess: 'deleted', id: id }
				}))
		}
	}
}
