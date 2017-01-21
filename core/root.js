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
				title,
				objects.data->'url' AS "url",
				objects.data->'description' AS "description"
			FROM
				objects
			WHERE
				model = 'static'
				AND
				enable
		`).then(staticPages => {

			responseData.data.static = staticPages
			responseData.data.userEmail = requestData.user && requestData.user.email || null
			responseData.data.lang = requestData.request.language
			responseData.data.ml = requestData.ml
			responseData.data = this.template['root'](responseData.data)
			return responseData
		})
	}
}
