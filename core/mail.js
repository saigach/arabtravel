/*!
 * Mail engine
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

const smtpConfig = {
	host: 'us502.directrouter.com',
	port: 465,
	secure: true, // use SSL
	auth: {
		user: 'noreply@arabtravel.jo',
		pass: '=txQ,C^alVr9'
	}
}

const mailFrom = '"Arabtravel " <noreply@arabtravel.jo>'

const nodemailer = require('nodemailer')

module.exports = class Mail {
	constructor() {
		this.transporter = nodemailer.createTransport(smtpConfig)
	}

	sendMail(to, subject, html) {
		return new Promise( (resolve, reject) =>
			this.transporter.sendMail({
				from: mailFrom,
				to: to,
				subject: subject,
				html: html
			}, (error, info) => {
				if (error)
					return reject(error)

				return resolve(info.response)
			})
		)
	}
}
