/*!
 * Root of page Engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

module.exports = class RootEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.template = templat
	}

	engine(requestData, responseData) {
		return this.DB.query(`
			SELECT
				url,
				title,
				description
			FROM
				static
			WHERE
				enable
		`).then(staticPages => {
			responseData.data.static = staticPages
			responseData.data = this.template['root'](responseData.data)
			return responseData
		})
	}
}
