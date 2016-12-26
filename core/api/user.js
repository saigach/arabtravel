/*!
 * API Users engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const escapeStr = str => "'" + String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"

module.exports = class APIUser {
	constructor(DB) {
		this.DB = DB
	}

	api(requestData) {
		let method = requestData.request.method
		let data = requestData.request.body || undefined
		let id = requestData.request.path.shift() || data && data.__id || null

		if (id === 'self')
			id = requestData.user.id

		if (id && !/^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))
			return Promise.resolve({
				code: 400,
				data: { error: 'User ID is not valid UUIDv1'}
			})

		if (data && data.id)
			delete data.id

		switch (method) {
			case 'GET':

				if (!id)
					return this.DB.query(`
						SELECT
							users.id,
							users.enable,
							users.title,
							users.email,
							users.phone,
							array_to_json(users.roles) AS roles
						FROM users
					`).then(rows => ({
						code: 200,
						data: rows
					}))

				return this.DB.query(`
						SELECT
							users.*,
							array_to_json(users.roles) AS roles
						FROM users
						WHERE users.id = '${id}'
				`).then(rows => {
					if (rows.length !== 1)
						return {
							code: 404,
							data: { error: `User "${id}"" not found`}
						}

					let item = Object.assign({}, rows[0].data || {}, rows[0], { data: null })
					if (item.password)
						delete item.password

					return {
						code: 200,
						data: item
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
							UPDATE users
							SET enable = NOT enable
							WHERE id = ${id}
							RETURNING enable
						`).then( rows => ({
							code: 200,
							data: rows[0]
						}))
					case 'password':
						let password = null
						if (data.password)
							password = data.password.trim()

						if (!password)
							return Promise.resolve({
								code: 400,
								data: { error: 'Password is empty'}
							})

						return this.DB.query(`
							UPDATE users
							SET password = encode(digest(${escapeStr(password)}, 'sha512'), 'hex')
							WHERE id = ${id}
							RETURNING id
						`).then( rows => ({
							code: 200,
							data: { sucess: 'password', id: rows[0].id }
						}))
					default:
						let enable = true
						if (data.enable !== undefined) {
							enable = !!data.enable
							delete data.enable
						}
						enable = enable && 'TRUE' || 'FALSE'

						let email = null
						if (data.email !== undefined) {
							email = String(data.email).trim().toLowerCase()
							delete data.email
						}
						if (!email || !/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/.test(email))
							return Promise.resolve({
								code: 400,
								data: { error: 'Wrong email value'}
							})
						email = escapeStr(email)

						let roles = null
						if (data.roles !== undefined) {
							roles = data.roles
							delete data.roles
						}
						if (!(roles instanceof Array) || roles.length < 1)
							return Promise.resolve({
								code: 400,
								data: { error: 'Roles not set'}
							})
						roles = `'{${roles.join(',')}}'`

						let title = ''
						if (data.title !== undefined) {
							title = String(data.title).trim()
							delete data.title
						}
						title = escapeStr(title)

						let phone = ''
						if (data.phone !== undefined) {
							phone = String(data.phone).trim()
							delete data.phone
						}
						phone = escapeStr(phone)

						data = escapeStr(JSON.stringify(data || {}))

						return this.DB.query(`
							INSERT INTO users (
								id,    enable,    email,    roles,    title,    phone,    data
							) VALUES (
								${id}, ${enable}, ${email}, ${roles}, ${title}, ${phone}, ${data}
							) ON CONFLICT (id) DO UPDATE SET
								enable = ${enable},
								email = ${email},
								roles = ${roles},
								title = ${title},
								phone = ${phone},
								data = ${data}
							RETURNING
								*,
								array_to_json(roles) AS roles
						`).then( rows => {
							let item = Object.assign({}, rows[0].data || {}, rows[0], { data: null })
							if (item.password)
								delete item.password

							return {
								code: 200,
								data: item
							}
						})
				}

			case 'DELETE':
				if (!id)
					return Promise.resolve({
						code: 400,
						data: { error: 'ID is not set' }
					})
				return this.DB.query(`
					DELETE FROM users
					WHERE id='${id}'
				`).then(rows => ({
					code: 200,
					data: { sucess: 'deleted', id: id }
				}))
		}
	}
}
