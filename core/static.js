/*!
 * Static pages engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

const MLTransform = require('./mltransform.js')

module.exports = class StaticEngine {
	constructor(DB, templat) {
		this.DB = DB
		this.template = templat
	}

	engine(page = '', requestData) {
		let url = String(page).replace(/[^a-z0-9\-]/,'')

		if (!url)
			return Promise.resolve({
				code: 404,
				data: {
					url: url,
					title: 'Not found',
					main: this.template['404']({
						lang: requestData.request.language,
						title: 'Not found',
						ml: requestData.ml
					})
				}
			})

		return this.DB.query(`
			SELECT
				*
			FROM
				objects
			WHERE
				model = 'static'
				AND
				data->>'url' = '${url}'
			LIMIT 1
		`).then(rows => {
			let item = rows.length && Object.assign({}, rows[0].data || {}, rows[0], { data: null }) || null

			if (!item) {

				if (!this.template[url])
					return {
						code: 404,
						data: {
							url: url,
							title: 'Not found',
							main: this.template['404']({
								lang: requestData.request.language,
								title: 'Not found',
								ml: requestData.ml
							})
						}
					}

				return {
					code: 200,
					data: {
						url: url,
						main: this.template[url]({
							lang: requestData.request.language,
							ml: requestData.ml
						})
					}
				}

			}

			item = MLTransform(item, requestData.request.language)

			item.ml = requestData.ml
			item.lang = requestData.request.language

			return {
				code: 200,
				data: {
					url: item.url || null,
					title: item.title,
					description: item.description,
					image: item.image,
					main: this.template['static'](item)
				}
			}
		})
	}
}
