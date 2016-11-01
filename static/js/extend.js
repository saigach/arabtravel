"use strict";

(function () {
	// requestAnimationFrame polyfill
	if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {

		['ms', 'moz', 'webkit', 'o'].forEach( (vendorPrefix) => {
			window.requestAnimationFrame = window[`${vendorPrefix}RequestAnimationFrame`]
			window.cancelAnimationFrame = window[`${vendorPrefix}CancelAnimationFrame`]
										|| window[`${vendorPrefix}CancelRequestAnimationFrame`]
		})

		if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
			let lastTime = 0
			window.requestAnimationFrame = function (callback, element) {
				let currTime = new Date().getTime()
				let timeToCall = Math.max(0, 16 - (currTime - lastTime))
				let id = window.setTimeout( () => callback(currTime + timeToCall), timeToCall)
				lastTime = currTime + timeToCall
				return id
			}
			window.cancelAnimationFrame = function (id) {
				window.clearTimeout(id)
			}
		}

	}

	// Array fill Polyfill
	if (!Array.prototype.fill) {
		Array.prototype.fill = function(value) {

			if (this == null) {
			  throw new TypeError('this is null or not defined');
			}

			let O = Object(this)
			let len = O.length >>> 0

			let start = arguments[1]
			let relativeStart = start >> 0

			let k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len)

			let end = arguments[2]
			let relativeEnd = end === undefined ? len : end >> 0;

			let final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len)

			while (k < final) {
				O[k] = value
				k++
			}

			return O
		}
	}


	// NodeList forEach extender
	if ( !('forEach' in document.getElementsByTagName('_')) )
		Object.defineProperty(
			HTMLCollection.prototype,
			'forEach',
			{
				value: Array.prototype.forEach,
				enumerable: true,
				configurable: true
			}
		)

	if ( !('forEach' in document.querySelectorAll('#_')) )
		Object.defineProperty(
			NodeList.prototype,
			'forEach',
			{
				value: Array.prototype.forEach,
				enumerable: true,
				configurable: true
			}
		)



	// Node extender
	Object.defineProperties(Node.prototype, {
		insertAfter: {
			value: function(newNode, referenceNode) {
				if (!referenceNode.nextSibling)
					this.appendChild(newNode)
				else
					this.insertBefore(newNode, referenceNode.nextSibling)
			},
			enumerable: true,
			configurable: true
		},
		remove: {
			value: function(){
				if (this.parentNode)
					this.parentNode.removeChild(this)
			},
			enumerable: true,
			configurable: true
		}
	})


	// Array extender
	Object.defineProperties(Array.prototype, {
		getUnique: {
			value: function(){
				return this.filter( (value, i, self) => self.indexOf(value) === i )
			},
			enumerable: true,
			configurable: true
		}
	})


	// classList polyfill
	if ( !('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg','g')) ) {

		const DOMEx = function (type, message) {
			this.name = type
			this.code = DOMException[type]
			this.message = message
		}
		DOMEx.prototype = Error.prototype

		const checkTokenAndGetIndex = (classList, token) => {
			if (token === '')
				throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified')

			if (/\s/.test(token))
				throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character')

			return Array.prototype.indexOf.call(classList, token)
		}

		class ClassList extends Array {
			constructor(elem) {
				super()
				let trimmedClasses = String.prototype.trim.call(elem.getAttribute('class') || '')
				let classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []

				trimmedClasses.forEach( className => this.push(className) )

				this._updateClassName = () => elem.setAttribute('class', this.toString())
			}

			item(i) {
				return this[i] || null
			}

			contains(token) {
				token += ''
				return checkTokenAndGetIndex(this, token) !== -1
			}

			add() {
				let tokens = arguments
				let i = 0
				let l = tokens.length
				let updated = false

				do {
					let token = tokens[i] + ''
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token)
						updated = true
					}
				} while (++i < l)

				if (updated)
					this._updateClassName()
			}

			remove() {
				let tokens = arguments
				let i = 0
				let l = tokens.length
				let updated = false

				do {
					let token = tokens[i] + ''
					let index = checkTokenAndGetIndex(this, token)

					while (index !== -1) {
						this.splice(index, 1)
						updated = true
						index = checkTokenAndGetIndex(this, token)
					}
				} while (++i < l)

				if (updated)
					this._updateClassName()
			}

			toggle(token) {
				token += '';
				let result = this.contains(token)
				let method = result ? force !== true && 'remove' : force !== false && 'add'

				if (method)
					this[method](token)

				if (force === true || force === false)
					return force
				else
					return !result
			}

			toString() {
				return this.join(' ')
			}
		}

		Object.defineProperty(
			Element.prototype,
			'classList',
			{
				get: function () {
					return new ClassList(this)
				},
				enumerable: true,
				configurable: true
		})

	} else {
		let testElement = document.createElement("_")

		testElement.classList.add('c1', 'c2')
		if (!testElement.classList.contains('c2'))
			['add', 'remove'].forEach( method => {
				let originalMethod = DOMTokenList.prototype[method]
				DOMTokenList.prototype[method] = function() {
					for(let i = 0; i < arguments.length; i++)
						originalMethod.call(this, arguments[i])
				}
			})

		testElement.classList.toggle('c3', false)
		if (testElement.classList.contains('c3')) {
			let originalToggle = DOMTokenList.prototype.toggle
			DOMTokenList.prototype.toggle = function(token, force) {
				if (1 in arguments && !this.contains(token) === !force)
					return force
				else
					return originalToggle.call(this, token)
			}
		}
	}
})()
