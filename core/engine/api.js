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

				switch (model) {
					case 'trip':
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
