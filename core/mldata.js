
const fs = require('fs')
const path = require('path')

let DATA = {}

const mlDirectory = path.resolve(process.cwd(), 'tpl/')
const reloadML = (filename) => {
	if (!filename)
		return

	let match = filename.match(/^multilang\.json$/i)
	if (match) {
		fs.readFile(path.resolve(mlDirectory, filename), 'utf8', (error, data) => {
			if (error)
				return console.error(error)

			let newData = null

			try {
				newData = JSON.parse(data)
			} catch (error) {
				console.error(error)
				newData = null
			}

			if (newData) {
				DATA = newData
				console.log('Multilanguage data updated')
			}
		})
	}
}
fs.readdir(mlDirectory, (error, files) =>
	error && console.error(error) || files.forEach(filename => reloadML(filename))
)
fs.watch(mlDirectory, (eventType, filename) => reloadML(filename))

module.exports = (lang = 'en') => {
	return new Proxy(DATA, {
		get: function(target, key) {
			if (!(key in target))
				return ''

			let value = target[key]
			return value[lang] || value['en'] || ''
		}
	})
}

