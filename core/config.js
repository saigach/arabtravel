/*!
 * Config engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')

// Config filr name
const configFileName = 'app.config.json'

/**
 * Read config file
 *
 * @param {path} Config file path
 * @return Config object
 */
const readConfigFile = (path) => {
	try {
		return JSON.parse( fs.readFileSync(path, 'utf8') )
	} catch (error) {
		console.error(error)
		return {}
	}
}

module.exports = class Config {
	/**
	 * Default config
	 *
	 * @exports
	 * @return Default config object
	 */
	static get default() {
		return {
			db: {
				host: 'localhost',
				port: '5432',
				dbname: '',
				user: '',
				password: '',
				timeout: 30
			},

			debug: {

			},

			gzip: true
		}
	}

	/**
	 * Creates an instance of Config
	 *
	 * @constructor
	 * @exports
	 * @this {Config}
	 * @param {configDirectoryPath} The config.json directory
	 * @param {otherConfig} Config object instances for merge with this
	 */
	constructor() {

		// Merga all configs
		Object.assign(this, utils.objectAssignDeep(
			Config.default,
			readConfigFile( path.resolve(process.cwd(), configFileName) )
		))

		// Set workDir
		this.directory = path.resolve(process.cwd())

		// Structure gzip variable
		this.gzip = !!this.gzip
	}
}
