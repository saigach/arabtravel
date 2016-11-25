/*!
 * API engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class APIEngine {
	constructor(DB) {
		this.DB = DB
	}

	engine(requestData) {

		console.dir(requestData)

		return Promise.all([
			this.DB.query(`
				SELECT *
				FROM objects
				WHERE model = 'trip'
			`)
		]).then(response => {
			let data = {
				trips: response[0]
			}

			return {
				code: 200,
				data: {
					title: 'Arabtravel Index',
					main: this.template['index'](data)
				}
			}
		})
	}
}
