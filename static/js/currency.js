(function(){

	const currencyList = ['usd', 'jod']

	window.addEventListener('DOMContentLoaded', () => {

		let currencyNodeList = []

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-field]'),
			currencyNode => currencyNodeList.push(currencyNode)
		)

		let setCurrency = (currency = currencyList[0]) => {
			if (currencyList.indexOf(currency) < 0)
				return

			localStorage.setItem('currency', currency)

			currencyNodeList.forEach( currencyNode => currencyNode.innerHTML = currency)
		}

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-set]'),
			currencySetNode => currencySetNode.addEventListener('click', event =>{
				event.preventDefault()
				setCurrency(currencySetNode.getAttribute('currency-set'))
			})
		)

		setCurrency(localStorage.getItem('currency') || undefined)

	})
})()
