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
				main: this.template['index']({})
			}
		})


		// return Promise.all([
		// 	this.DB.query(`
		// 		SELECT *
		// 		FROM config
		// 		WHERE key IN ('globalStat', 'mainVideo')
		// 	`),
		// 	this.DB.query(`
		// 		SELECT
		// 			id,
		// 			concat('/news/',ts::date,'/',url) AS href,
		// 			to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
		// 			EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts,
		// 			image,
		// 			title
		// 		FROM news
		// 		WHERE enable AND ts < timezone('utc', now())
		// 		ORDER BY ts DESC
		// 	`),
		// 	this.DB.query(`
		// 		SELECT
		// 			id,
		// 			concat('/projects/',url) AS href,
		// 			to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
		// 			EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts,
		// 			type,
		// 			image,
		// 			title,
		// 			description,
		// 			completed,
		// 			type,
		// 			sum
		// 		FROM projects
		// 		WHERE enable AND ts < timezone('utc', now()) AND big
		// 		LIMIT 1
		// 	`).then(rows => rows.length && rows[0]),
		// 	this.DB.query(`
		// 		SELECT
		// 			id,
		// 			concat('/projects/',url) AS href,
		// 			to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
		// 			EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts,
		// 			type,
		// 			image,
		// 			title,
		// 			completed
		// 		FROM projects
		// 		WHERE enable AND ts < timezone('utc', now()) AND NOT big AND main
		// 		ORDER BY ts DESC
		// 		LIMIT 4
		// 	`),
		// 	this.DB.query(`
		// 		SELECT
		// 			id,
		// 			concat('/projects/',url) AS href,
		// 			to_char(ts, 'YYYY-MM-DD\"T\"HH24:MI:SS\"Z\"') AS datetime,
		// 			EXTRACT(EPOCH FROM ts AT TIME ZONE 'UTC') AS ts,
		// 			type,
		// 			image,
		// 			title,
		// 			completed
		// 		FROM projects
		// 		WHERE enable AND ts < timezone('utc', now()) AND completed AND NOT main AND NOT big
		// 		ORDER BY ts DESC
		// 	`)
		// ]).then(response => {
		// 	let data = response[0].reduce( (prev, row) => {
		// 					prev[row.key] = row.value
		// 					return prev
		// 				}, {})

		// 	data.news = response[1].reduce( (prev, row) =>
		// 		prev.concat( this.template['news-card'](row) ), []
		// 	)

		// 	data.mainProject = response[2]
		// 	data.mainProjects = response[3]

		// 	data.completedProjects = response[4].reduce( (prev, row) =>
		// 		prev.concat( this.template['project-card'](row) ), []
		// 	)

		// 	return data
		// }).then(data => ({
		// 	code: 200,
		// 	data: {
		// 		title: 'Фонд Ройзмана',
		// 		main: this.template['index'](data),
		// 		mainVideo: data.mainVideo || null
		// 	}
		// }))
	}
}
