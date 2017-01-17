/*!
 * User Page engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class UserEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.template = templat
	}

	engine(requestData) {
		return Promise.resolve({
			code: 200,
			data: {
				title: 'User page',
				main: this.template['user']({
					lang: requestData.request.language,
					ml: requestData.ml
				})
			}
		})
	}
}
