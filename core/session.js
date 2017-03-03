/*!
 * Session engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
const DEFAULT_SESSION_DURATION = 86400

const RETURNING = `
	RETURNING
		id,
		timezone('UTC', NOW() + (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,${DEFAULT_SESSION_DURATION})::text||' seconds')::interval) AS expires,
		data
`

const url = require('url')
const querystring = require('querystring')

const DB = new (require('./db.js'))()

module.exports = class Session {
	constructor(request, body = null, ml = false) {
		let sessionId = request.headers['cookie'] &&
						request.headers['cookie'].match(/session_id\s*=\s*([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i)
		sessionId =  sessionId && sessionId[1] || null

		this.host = request.headers['host'] || 'localhost'
		this.ip = request.headers['x-real-ip'] || request.connection.remoteAddress || null

		let requestUrl = url.parse(request.url, true, false)

		let requestPath = requestUrl.pathname.split(/\/+/).map(value => value.toLowerCase().trim()).filter(value => !!value)

		this.request = {
			method: request.method.toUpperCase(),
			language: ml ? requestPath.shift() || 'en' : 'en',
			path: requestPath,
			query: requestUrl.query,
			body: null,
			file: request.headers['x-file'] || null
		}

		if (body) {
			try {
				this.request.body = JSON.parse(body)
			} catch(_) {
				this.request.body = querystring.parse(body)
			}
		}

		this.get = (
			sessionId ? DB.query(`
				SELECT
					sessions.id AS id,
					sessions.data AS data,
					users.id AS owner,
					users.roles AS roles,
					users.email AS email
				FROM sessions
				LEFT JOIN users ON sessions.owner = users.id
				WHERE
					sessions.id = '${sessionId}'
					AND
					sessions.ts > timezone('UTC', NOW() - (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,86400)::text||' seconds')::interval)
					LIMIT 1
			`).then(rows => rows.length && rows[0] || { id: null, data: {}, owner: null })
			: Promise.resolve({ id: null, data: {}, owner: null })
		).then(session => {
			this.id = session.id
			this.data = session.data
			this.user = session.owner && { id: session.owner, roles: session.roles, email: session.email } || null
			return this
		})
	}

	set(response) {

		this.response = {
			code: response.code || 200,
			location: response.location || null,
			data: null,
			type: null
		}

		if (response.data !== null && response.data !== undefined) {
			if (typeof response.data === 'string') {
				this.response.data = response.data
				this.response.type = 'text/html; charset=utf-8'
			} else {
				this.response.data = JSON.stringify(response.data)
				this.response.type = 'application/json; charset=utf-8'
			}
		}

		if (response.user === null)
			this.user = null

		if (!this.user || !this.user.id) {

			if (!this.id)
				return Promise.resolve(this)

			return DB.query(`
				DELETE FROM sessions
				WHERE id = '${this.id}'
			`).then(rows => {
				this.id = null
				this.expires = null
				this.data = null
				return this
			})
		}

		let id = this.id && `'${this.id}'` || null
		let owner = `'${this.user.id}'`
		let data = "'" +
				   JSON.stringify(typeof response.session === 'object' && response.session || this.data)
				   .replace(/\\/g, "\\\\")
				   .replace(/'/g, "\\'")
				   + "'"

		return (
			this.id ? DB.query(`
				UPDATE sessions SET
					owner = ${owner},
					data = ${data}
				WHERE
					id = '${this.id}'
				${RETURNING}
			`) : DB.query(`
				INSERT INTO sessions ( owner,    data    )
							  VALUES ( ${owner}, ${data} )
				${RETURNING}
			`)
		).then(rows => rows.length && rows[0] || { id: null, expires: null, data: {} })
		.then( session => {
			this.id = session.id
			this.expires = session.expires && new Date(session.expires).toUTCString() || null
			this.data = session.data
			return this
		})
	}
}
