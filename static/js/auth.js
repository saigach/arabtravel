(function(){
	window.addEventListener('DOMContentLoaded', () => {
		let loginFormModal = document.getElementById('login-form-modal')

		if (!loginFormModal)
			return

		let loginForm = loginFormModal.querySelector('form')

		if (!loginForm)
			return

		loginForm.addEventListener('submit', event => {
			event.preventDefault()

			let xhr = new XMLHttpRequest
			xhr.open('POST','/auth/login', true)

			xhr.addEventListener('error', error => {
				console.error(error)
				UIkit.notify('Internal service error', {status  : 'danger'})

			})

			xhr.addEventListener('load', () => {
				if( 200 !== xhr.status)
					return UIkit.notify('Incorrect email or password', {status  : 'warning' })

				UIkit.modal('#login-form-modal').hide()

				let currentAccountLink = document.getElementById('currentAccountLink')
				if (!currentAccountLink)
					return

				currentAccountLink.href = '/me'

				let currentAccount = document.getElementById('currentAccount')
				if (!currentAccount)
					return

				let data = {}

				try {
					 data = JSON.parse(xhr.response)
				} catch (error) {
					console.error(error)
					return
				}

				if (!data.email)
					return

				currentAccount.innerHTML = data.email

			})

			xhr.send(JSON.stringify({
				email: loginForm.elements.email.value,
				password: loginForm.elements.password.value
			}))

		})
	})
})()
