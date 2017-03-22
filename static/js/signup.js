(function(){
	window.addEventListener('DOMContentLoaded', () => {
		let signupFormModal = document.getElementById('signup-form-modal')

		if (!signupFormModal)
			return

		let signupForm = signupFormModal.querySelector('form')

		if (!signupForm)
			return

		signupForm.addEventListener('submit', event => {
			event.preventDefault()

			var xhr = new XMLHttpRequest
			xhr.open('POST','/ar/api/singup', true)

			xhr.addEventListener('error', error => {
				console.error(error)
				UIkit.notify('Internal service error', {status  : 'danger'})

			})

			xhr.addEventListener('load', () => {
				if( 401 === xhr.status)
					return UIkit.notify('Email already used', { status  : 'warning' })

				if( 200 !== xhr.status)
					return UIkit.notify(xhr.response, { status  : 'warning' })

				UIkit.modal('#signup-form-modal').hide()

				let data = {}

				try {
					 data = JSON.parse(xhr.response)
				} catch (error) {
					console.error(error)
					return
				}

				if (!data.email)
					return UIkit.notify('Internal service error', { status  : 'warning' })

				return UIkit.notify('Check email', { status  : 'success' })

			})

			xhr.send(JSON.stringify({
				email: signupForm.elements.email.value,
				title: signupForm.elements.title.value
			}))

		})
	})
})()
