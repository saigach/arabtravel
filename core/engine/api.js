/*!
 * API engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

const INFO_EMAIL = 'd@ajaw.it'

const Mail = require('../mail.js')
const MLTransform = require('../mltransform.js')

const escapeStr = str => "'" + String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"

module.exports = class APIEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.mail = new Mail()
		this.template = templat
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
					case 'package':
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
								code: 401,
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

				if (method !== 'POST')
					return Promise.resolve({
						code: 400,
						data: { error: 'Method is not allowed'}
					})

				let data = requestData.request.body || {}
				let order = data.order || null

				if (!order)
					return Promise.resolve({
						code: 400,
						data: { error: 'Bad order data'}
					})

				return new Promise( (resolve, reject) => {
					if (requestData.user && requestData.user.id)
						return resolve(requestData.user)

					return reject(data.human || null)
				}).catch( human => {

					if (!human)
						return Promise.reject({
							code: 400,
							data: { error: 'Human data is empty'}
						})

					let email = human.email && human.email.trim() || null

					if (!email)
						return Promise.reject({
							code: 400,
							data: { error: 'Human email is empty'}
						})

					if (!/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/.test(email))
						return Promise.reject({
							code: 400,
							data: { error: 'Email is not valid'}
						})

					email = escapeStr(email)

					return this.DB.query(`
						SELECT
							users.email
						FROM
							users
						WHERE
							enable
							AND
							email = ${email}
						LIMIT 1
					`).then(users => {

						if (users.length > 0)
							return Promise.reject({
								code: 401,
								data: 'Unauthorized'
							})

						let title = human.title && human.title.trim() || null

						if (!title)
							return reject({
								code: 400,
								data: { error: 'Human title is empty'}
							})

						title = escapeStr(title)

						let phone = escapeStr(human.phone && human.phone.trim() || '')
						let password = Math.random().toString(36).slice(-8)

						return this.DB.query(`
							INSERT INTO users (
								email,    title,    phone,    password
							) VALUES (
								${email}, ${title}, ${phone}, encode(digest(${escapeStr(password)}, 'sha512'), 'hex')
							) RETURNING
								title,
								email,
								id
						`).then( users => {

							let user = users[0]

							this.mail.sendMail(
								user.email,
								requestData.ml.emailNewUserTitle,
								this.template['email-new-user']({
									lang: requestData.request.language,
									ml: requestData.ml,
									user: Object.assign({}, user, { password })
								})
							)

							return user
						})
					})
				}).then( user => {
					if (order.id)
						delete order.id

					if (order.enable)
						delete order.enable

					if (order.owner)
						delete order.owner

					order.date = new Date()

					let owner = "'" + user.id + "'"

					let title = escapeStr(JSON.stringify({
						en: 'New order at ' + order.date.toString(),
						ar: 'New order at ' + order.date.toString()
					}))

			 		let data = escapeStr(JSON.stringify(order))

			 		return this.DB.query(`
						INSERT INTO objects (
							model,   enable, owner,    title,
							data
						) VALUES (
							'order', TRUE,   ${owner}, ${title},
							jsonb_set(${data}::jsonb,'{hrid}'::text[],nextval('order_hrid')::text::jsonb)
						) RETURNING
							*
					`).then( rows => {

						let order = Object.assign({}, rows[0].data || {}, rows[0], { data: null })

						// this.mail.sendMail(
						// 	user.email,
						// 	requestData.ml.emailOrderConfirmTitle,
						// 	this.template['email-order-confirm']({
						// 		lang: requestData.request.language,
						// 		ml: requestData.ml,
						// 		user: user,
						// 		order: order
						// 	})
						// )

						return {
							code: 200,
							data: order
						}
					})
				}).catch( error => error )
			case 'me':
				if (!requestData.user || !requestData.user.id)
					return Promise.resolve({
						code: 401,
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
						code: 401,
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
						key IN ('exchangeRate', 'exchangeRateSAR', 'exchangeRateEGP', 'processingFee', 'egyptianMarkUp')
				`).then(rows => ({
					code: 200,
					data: rows.reduce( (prev, row) => Object.assign(prev, { [row.key]: row.value } ), {} )
				}))
			case 'message':

				let messageData = requestData.request.body || {}

				if (!messageData.name)
					return Promise.resolve({
						code: 400,
						data: { error: 'Name is not valid' }
					})

				let message = 'Name: ' + String(messageData.name) + '\n'

				if (!messageData.email)
					return Promise.resolve({
						code: 400,
						data: { error: 'Email is not valid' }
					})

				message += '<p><b>E-mail:</b> ' + String(messageData.email) + '</p>'

				message += '<p><b>Message:</b> ' + (messageData.message && String(messageData.message) || '') + '</p>'

				return this.mail
					.sendMail(INFO_EMAIL, 'Message from arabtravel webform', message)
					.then(result => {
						return {
							code: 200,
							date: { sucess: true }
						}
					}).catch(error => {
						return {
							code: 500,
							date: { error: 'Mail not sended' }
						}
					})
			case 'confirm':
				if (!requestData.user || !requestData.user.id)
					return Promise.resolve({
						code: 401,
						session: null,
						data: 'Unauthorized'
					})

				let orderHrid = requestData.request.path.shift() || null
				if (!orderHrid || !/^[0-9]+$/i.test(orderHrid))
					return Promise.resolve({
						code: 400,
						data: { error: 'ID is not valid Number'}
					})

				orderHrid = Number.parseInt(orderHrid)

				return this.DB.query(`
					SELECT
						*
					FROM
						objects
					WHERE
						model = 'order'
						AND
						enable
						AND
						owner = '${requestData.user.id}'
						AND
						(data->>'hrid')::bigint = ${orderHrid}
				`).then(rows => {

					if (rows.length !== 1)
						return {
							code: 404,
							data: { error: `Object "${orderHrid}"" not found`}
						}

					let order = Object.assign({}, rows[0].data || {}, rows[0], { data: null })

					this.mail.sendMail(
						requestData.user.email,
						requestData.ml.emailOrderConfirmTitle,
						this.template['email-order-confirm']({
							lang: requestData.request.language,
							ml: requestData.ml,
							user: requestData.user,
							order: MLTransform(order, requestData.request.language)
						})
					)

					return {
						code: 200,
						data: order
					}
				})
			case 'singup':
				if (requestData.user && requestData.user.id)
					return Promise.resolve({
						code: 409,
						data: { error: 'Already authorized'}
					})

				if (method !== 'POST')
					return Promise.resolve({
						code: 400,
						data: { error: 'Method is not allowed'}
					})

				let userData = requestData.request.body || {}

				let email = userData.email && userData.email.trim() || null

				if (!email)
					return Promise.resolve({
						code: 400,
						data: { error: 'Human email is empty'}
					})

				if (!/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/.test(email))
					return Promise.resolve({
						code: 400,
						data: { error: 'Email is not valid'}
					})

				email = escapeStr(email)

				return this.DB.query(`
					SELECT
						users.email
					FROM
						users
					WHERE
						email = ${email}
					LIMIT 1
				`).then(users => {

					if (users.length > 0)
						return {
							code: 401,
							data: 'Unauthorized'
						}

					let title = userData.title && userData.title.trim() || null

					if (!title)
						return {
							code: 400,
							data: { error: 'Human title is empty'}
						}

					title = escapeStr(title)

					let phone = escapeStr(userData.phone && userData.phone.trim() || '')
					let password = Math.random().toString(36).slice(-8)

					return this.DB.query(`
						INSERT INTO users (
							email,    title,    phone,    password
						) VALUES (
							${email}, ${title}, ${phone}, encode(digest(${escapeStr(password)}, 'sha512'), 'hex')
						) RETURNING
							title,
							email,
							id
					`).then( users => {

						let user = users[0]

						this.mail.sendMail(
							user.email,
							requestData.ml.emailNewUserTitle,
							this.template['email-new-user']({
								lang: requestData.request.language,
								ml: requestData.ml,
								user: Object.assign({}, user, { password })
							})
						)

						return {
							code: 200,
							data: user
						}
					})
				})
			case 'resetpassword':
				if (requestData.user && requestData.user.id)
					return Promise.resolve({
						code: 409,
						data: { error: 'Already authorized'}
					})

				if (method !== 'POST')
					return Promise.resolve({
						code: 400,
						data: { error: 'Method is not allowed'}
					})

				let userData1 = requestData.request.body || {}

				let email1 = userData1.email && userData1.email.trim() || null

				if (!email1)
					return Promise.resolve({
						code: 400,
						data: { error: 'Human email is empty'}
					})

				if (!/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/.test(email1))
					return Promise.resolve({
						code: 400,
						data: { error: 'Email is not valid'}
					})

				email1 = escapeStr(email1)

				let newPassword = Math.random().toString(36).slice(-8)

				return this.DB.query(`
					UPDATE
						users
					SET
						password = encode(digest(${escapeStr(newPassword)}, 'sha512'), 'hex')
					WHERE
						email = ${email1}
					RETURNING
						title,
						email,
						id
				`).then(users => {

					if (users.length !== 1)
						return {
							code: 404,
							data: 'User not found'
						}

					let user = users[0]

					this.mail.sendMail(
						user.email,
						requestData.ml.emailNewPassword,
						this.template['email-new-password']({
							lang: requestData.request.language,
							ml: requestData.ml,
							user: Object.assign({}, user, { password: newPassword })
						})
					)

					return {
						code: 200,
						data: user
					}
				})
			default:
				return Promise.resolve({
					code: 400,
					data: { error: 'Command is not allowed'}
				})
		}
	}
}
