/*!
 * API Trash engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

module.exports = class APITrash {
	constructor(db) {
		this.db = db
	}

	api(requestData) {
		return Promise.resolve({
			data: { notify: 'Trash API is under construction' }
		})
	}
}
