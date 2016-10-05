/*!
 * Utilites for other modules
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

module.exports = class Utils {
	/**
	 * Check is value an object
	 *
	 * @exports
	 * @param {value} Any value
	 * @return Boolean
	 */
	static isObject(value) {
		return typeof value === 'object' && !Array.isArray(value) && value !== null
	}

	/**
	 * Assign multiple objects with deep properties scan
	 *
	 * @exports
	 * @param {target} The target object
	 * @param {sources} The source object(s)
	 * @return The target object
	 */
	static objectAssignDeep(target, ...sources) {
		if (!sources.length)
			return target

		if (!Utils.isObject(target))
			target = sources.shift()

		sources.forEach( source => {
			if (Utils.isObject(source))
				Object.keys(source).forEach( key =>
					Object.assign(target, { [key]: Utils.objectAssignDeep(target[key], source[key]) })
				)
			else
				target = source
		})

		return target
	}
}
