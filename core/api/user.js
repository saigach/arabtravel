/*!
 * API Users engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

module.exports = class APIUsers {
	constructor(db) {
		this.db = db
	}

	api(requestData) {
		return Promise.resolve({
			data: { notify: 'Users API is under construction' }
		})
	}
}
