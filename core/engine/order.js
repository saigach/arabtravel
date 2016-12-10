/*!
 * Order Page engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class OrderEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.template = templat
	}

	engine(requestData) {
		return Promise.resolve({
			code: 200,
			data: {
				angular: true,
				title: 'Arabtravel Index',
				main: this.template['order']({})
			}
		})
	}
}
