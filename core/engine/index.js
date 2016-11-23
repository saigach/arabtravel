/*!
 * Index Page engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class IndexEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.template = templat
	}

	engine(requestData) {
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
