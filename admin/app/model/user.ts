import { Model } from './model'

export const UserRoles: { id: string, title: string }[] = [
	{ id: 'admin', title: 'Administrator' },
	{ id: 'user', title: 'User' },
	{ id: 'hotel', title: 'Hotel' }
]

export class User extends Model {
	static __api: string = 'user'

	email: string = ''
	roles: { id: string, title: string }[] = []

	description: string = ''

	image: string = ''

	constructor(value: any = {}) {
		super(value)

		this.email = String(value.email || '')
		this.description = String(value.description || '')
		this.image = String(value.image || '')

		// this.roles = ProjectType.find( (type:{ id: string, title: string }) => type.id === value.type) || ProjectType[0]
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			email: this.email,
			// roles: this.roles,
			description: this.description || '',
			image: this.image
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
