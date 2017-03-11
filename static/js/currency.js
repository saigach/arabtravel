(function(){

	window.addEventListener('DOMContentLoaded', () => {

		let currencyFieldNodeList = []

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-field]'),
			currencyNode => currencyFieldNodeList.push(currencyNode)
		)

		let setCurrency = (currency = 'USD') => {
			localStorage.setItem('currency', currency)
			let currencyName = document.querySelector(`[currency-set="${currency}"]`)
			currencyName = currencyName && currencyName.innerHTML || ''

			if (!currencyName)
				return

			currencyFieldNodeList.forEach( currencyNode => currencyNode.innerHTML = currencyName)
		}

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-set]'),
			currencySetNode => currencySetNode.addEventListener('click', event =>{
				event.preventDefault()
				setCurrency(currencySetNode.getAttribute('currency-set') || undefined)
			})
		)

		setCurrency(localStorage.getItem('currency') || undefined)

	})
})()
