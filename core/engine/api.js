/*!
 * API engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class APIEngine {
	constructor(DB) {
		this.DB = DB
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
						if (!id)
							return this.DB.query(`
								SELECT
									objects.id,
									objects.title,
									objects.enable,
									objects.data
								FROM
									objects
								WHERE
									model = 'trip' AND
									enable
							`).then(response => ({
								code: 200,
								data: response.map( value => Object.assign(value, value.data, { data: null }) )
							}))

						return this.DB.query(`
							SELECT
								objects.id,
								objects.title,
								objects.enable,
								objects.data
							FROM objects
							WHERE
								model = 'trip'
								AND
								objects.id = '${id}'
						`).then(response => ({
							code: 200,
							data: Object.assign(response[0], response[0].data, { data: null })
						}))
					case 'package':
						if (!id)
							return this.DB.query(`
								SELECT
									objects.id,
									objects.title,
									objects.enable,
									objects.data
								FROM
									objects
								WHERE
									model = 'package' AND
									enable
							`).then(response => ({
								code: 200,
								data: response.map( value => Object.assign(value, value.data, { data: null }) )
							}))

						return this.DB.query(`
							SELECT
								objects.id,
								objects.title,
								objects.enable,
								objects.data
							FROM objects
							WHERE
								model = 'package'
								AND
								objects.id = '${id}'
						`).then(response => ({
							code: 200,
							data: Object.assign(response[0], response[0].data, { data: null })
						}))
					default:
						return Promise.resolve({
							code: 400,
							data: { error: 'Model is not allowed'}
						})
				}
			default:
				return Promise.resolve({
					code: 400,
					data: { error: 'Command is not allowed'}
				})
		}
	}
}
