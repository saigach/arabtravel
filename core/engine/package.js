/*!
 * Package Page engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class PackageListEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.template = templat
	}

	engine(requestData) {
		return Promise.resolve({
			code: 200,
			data: {
				angular: true,
				title: 'Package',
				main: this.template['package']({
					lang: requestData.request.language
				})
			}
		})
	}
}
