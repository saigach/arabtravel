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
				*,
				concat('/news/',ts::date,'/',url) AS href,
				to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
				EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts
			FROM static
			WHERE url = '${url}'
			LIMIT 1
		`).then(rows => {
			let item = rows.length && rows[0] || null
			if (!item)
				return {
					code: 404,
					data: {
						url: url,
						title: 'Страница не найдена',
						main: this.template['404']({ title: 'Страница не найдена' })
					}
				}

			return Promise.all([
				this.DB.query(`
					SELECT
						id,
						concat('/news/',ts::date,'/',url) AS href,
						to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
						EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts,
						image,
						title
					FROM news
					WHERE enable AND ts < timezone('utc', now())
					ORDER BY ts DESC
				`),
				this.DB.query(`
					SELECT
						id,
						concat('/projects/',url) AS href,
						to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
						EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts,
						type,
						image,
						title,
						completed
					FROM projects
					WHERE enable AND ts < timezone('utc', now()) AND NOT completed
					ORDER BY ts DESC
					LIMIT 3
				`)
			]).then(response => {

				let data = {
					image: item.image,
					item: item,
					news: response[0].reduce( (prev, row) =>
						prev.concat( this.template['news-card'](row) ), []
					),
					projects: response[1].reduce( (prev, row) =>
						prev.concat( this.template['project-card'](row) ), []
					)
				}

				return {
					code: 200,
					data: {
						url: item.href || null,
						title: item.title,
						description: item.description,
						main: this.template['static'](data)
					}
				}
			})
		})
	}
}
