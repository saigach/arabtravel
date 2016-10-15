import { Model } from './model'

import { UUID } from './uuid';

export class User extends Model {
	name: string
	description: string

	email: string

	constructor(value: any = {}) {
		super(value)
		this.parse(value)
	}

	parse({ name = '', description = '', email = null } = {}): Error | void {
		this.name = String(name)
		this.description = String(description)

		if (!email)
			return new Error('email is requared')

		if (!/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]+?[a-z0-9]$/.test(email))
			return new Error('email is not valid')

		this.email = email
	}

	toJSON(): {} {
		return Object.assign(super.toJSON(), {
			name: this.name,
			description: this.description,

			email: this.email
		})
	}
}
