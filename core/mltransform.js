/*!
 * ML Transform Engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

const dateOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
}

const transform = (obj, lang = 'en') => {
	let newObj = {}
	for (let key in obj) {
		if (obj[key] instanceof Array)
			newObj[key] = obj[key].map( value => transform(value, lang) )
		else if (obj[key] !== null && typeof obj[key] === 'object' ) {
			if (lang in obj[key] && typeof obj[key][lang] === 'string')
				newObj[key] = obj[key][lang]
			else
				newObj[key] = transform(obj[key], lang)
		} else if (typeof obj[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{1,4}Z$/.test(obj[key]))
			newObj[key] = new Date(obj[key]).toLocaleString(lang, dateOptions)
		else
			newObj[key] = obj[key]
	}
	return newObj
}

module.exports = transform
