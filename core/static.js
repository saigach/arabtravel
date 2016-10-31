/*!
 * Static pages engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

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
					title: 'Страница не найдена',
					main: this.template['404']({ title: 'Страница не найдена' })
				}
			})

		return this.DB.query(`
			SELECT
				*
			FROM static
			WHERE url = '${url}'
			LIMIT 1
		`).then(rows => {
			let item = rows.length && rows[0] || null

			if (!item) {

				if (!this.template[url])
					return {
						code: 404,
						data: {
							url: url,
							title: 'Страница не найдена',
							main: this.template['404']({ title: 'Страница не найдена' })
						}
					}

				return {
					code: 200,
					data: {
						url: url,
						main: this.template[url]({})
					}
				}

			}

			return {
				code: 200,
				data: {
					url: item.url || null,
					title: item.title,
					description: item.description,
					main: this.template['static'](item)
				}
			}
		})
	}
}
