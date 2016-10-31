/*!
 * Session engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'
const DEFAULT_SESSION_DURATION = 86400

const url = require('url')
const querystring = require('querystring')

const DB = new (require('./db.js'))()

module.exports = class Session {
	static getSQLSession(sessionId) {
		if (sessionId)
			return DB.query(`SELECT sessions.id AS id, sessions.data AS data, users.id AS owner, users.roles AS roles FROM sessions LEFT JOIN users ON sessions.owner = users.id WHERE sessions.id = '${sessionId}' AND sessions.ts > timezone('UTC', NOW() - (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,86400)::text||' seconds')::interval) LIMIT 1`)
			.then(rows => rows.length !== 1 && DB.query(`INSERT INTO sessions(id) VALUES(DEFAULT) RETURNING id, data, null AS owner`) || rows).then(rows => rows[0])
		return DB.query(`INSERT INTO sessions(id) VALUES(DEFAULT) RETURNING id, data, null AS owner`).then(rows => rows[0])
	}

	constructor(request, body = null, empty = false) {
		let sessionId = request.headers['cookie'] &&
						request.headers['cookie'].match(/session_id\s*=\s*([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i)

		this.host = request.headers['host'] || 'localhost'
		this.ip = request.headers['x-real-ip'] || request.connection.remoteAddress || null

		let requestUrl = url.parse(request.url, true, false)

		this.request = {
			method: request.method.toUpperCase(),
			path: requestUrl.pathname.split(/\/+/).map(value => value.toLowerCase().trim()).filter(value => !!value),
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

		this.empty = !!empty

		if (this.empty) {
			this.id = null
			this.data = {}
			this.user = null
			this.get = Promise.resolve(this)
		} else
			this.get = Session.getSQLSession(sessionId && sessionId[1] || null)
				.then(session => {
					this.id = session.id
					this.data = session.data
					this.user = session.owner && { id: session.owner, roles: session.roles } || null
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

		if (response.session === null)
			return DB.query(`DELETE FROM sessions WHERE id = '${this.id}'`).then(rows => {
				this.id = null
				this.expires = null
				this.data = null
				return this
			})

		if (this.empty)
			return Promise.resolve(this)

		let json = JSON.stringify(typeof response.session === 'object' && response.session || this.data)
		return DB.query(`UPDATE sessions SET data = '${json}'` + (this.user && this.user.id && `, owner='${this.user.id}'` || '') + ` WHERE id = '${this.id}' RETURNING id, timezone('UTC', NOW() + (COALESCE((SELECT value->>0 FROM config WHERE key = 'sessionDuration' LIMIT 1)::integer,${DEFAULT_SESSION_DURATION})::text||' seconds')::interval) AS expires, data`).then(rows => {
				this.id = rows[0].id
				this.expires = new Date(rows[0].expires).toUTCString()
				this.data = rows[0].data
				return this
			})
	}
}

