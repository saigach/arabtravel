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
		return Promise.resolve({
			code: 200,
			data: {
				title: 'Arabtravel Index',
				main: this.template['index']({
					lang: requestData.request.language,
					ml: requestData.ml
				})
			}
		})
	}
}
