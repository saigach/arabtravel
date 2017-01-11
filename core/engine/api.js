/*!
 * API engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

const Mail = require('../mail.js')

const escapeStr = str => "'" + String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"

module.exports = class APIEngine {
	constructor(DB) {
		this.DB = DB
		this.mail = new Mail()
	}

	engine(requestData) {
		let method = requestData.request.method
		let command = requestData.request.path.shift()

		switch(command) {
			case 'objects':
				if (method !== 'GET')
					return Promise.resolve({
						code: 400,
						data: { error: 'Method is not allowed'}
					})

				let model = requestData.request.path.shift()

				let id = requestData.request.path.shift() || null
				if (id && !/^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id))
					return Promise.resolve({
						code: 400,
						data: { error: 'ID is not valid UUIDv1'}
					})

				switch (model) {
					case 'trip':
						if (id)
							return this.DB.query(`
								SELECT
									objects.id,
									objects.enable,
									objects.title,
									objects.data
								FROM
									objects
								WHERE
									objects.model = '${model}'
									AND
									objects.id = '${id}'
									AND
									enable
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
					case 'hotel':
					case 'point':
					case 'vehiclet':
						return this.DB.query(`
							SELECT
								objects.id,
								objects.title,
								objects.enable,
								objects.data
							FROM
								objects
							WHERE
								model = '${model}' AND
								enable
						`).then(response => ({
							code: 200,
							data: response.map( value => Object.assign({}, value.data || {}, value, { data: null }) )
						}))
					case 'order':

						if (!requestData.user || !requestData.user.id)
							return Promise.resolve({
								code: 403,
								session: null,
								data: 'Unauthorized'
							})

						return this.DB.query(`
							SELECT
								objects.id,
								objects.title,
								objects.enable,
								objects.data
							FROM
								objects
							WHERE
								model = 'order'
								AND
								enable
								AND
								owner = '${requestData.user.id}'
						`).then(response => ({
							code: 200,
							data: response.map( value => Object.assign({}, value.data || {}, value, { data: null }) )
						}))
					default:
						return Promise.resolve({
							code: 400,
							data: { error: 'Model is not allowed'}
						})
				}
			case 'order':

				if (!requestData.user || !requestData.user.id)
					return Promise.resolve({
						code: 403,
						session: null,
						data: 'Unauthorized'
					})

				let data = requestData.request.body || undefined

				if (data.id)
					delete data.id

				if (data.enable)
					delete data.enable

				if (data.owner)
					delete data.owner

				data.date = new Date()

				let owner = "'" + requestData.user.id + "'"
				let title = "'New order at " + data.date.toString() + "'"

				// TODO: Check date

			 	data = escapeStr(JSON.stringify(data || {}))

				return this.DB.query(`
					INSERT INTO objects (
						model,   enable, owner,    title,    data
					) VALUES (
						'order', TRUE,   ${owner}, ${title}, ${data}
					) RETURNING
						objects.id
				`).then( rows => ({
					code: 200,
					data: { id: rows[0].id }
				}) )

				// return this.mail
				// 	.sendMail('d@ajaw.it', 'Test mail', 'Test text')
				// 	.then(result => {
				// 		return {
				// 			code: 200,
				// 			date: { sucess: 'Mail sended' }
				// 		}
				// 	})
			case 'me':
				if (!requestData.user || !requestData.user.id)
					return Promise.resolve({
						code: 403,
						session: null,
						data: 'Unauthorized'
					})

				return this.DB.query(`
					SELECT
						users.email,
						users.phone,
						users.title,
						users.data
					FROM
						users
					WHERE
						enable
						AND
						id = '${requestData.user.id}'
					LIMIT 1
				`).then(response =>
					response.length !== 1 ? ({
						code: 403,
						session: null,
						data: 'Unauthorized'
					}) : ({
						code: 200,
						data: Object.assign({}, response[0].data || {}, response[0], { data: null })
					})
				)
			case 'config':
				return this.DB.query(`
					SELECT
						key,
						value
					FROM
						config
					WHERE
						key IN ('exchangeRate', 'processingFee', 'egyptianMarkUp')
				`).then(rows => ({
					code: 200,
					data: rows.reduce( (prev, row) => Object.assign(prev, { [row.key]: row.value } ), {} )
				}))
			default:
				return Promise.resolve({
					code: 400,
					data: { error: 'Command is not allowed'}
				})
		}
	}
}
