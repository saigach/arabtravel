import { Model } from './model'

export const UserRoles: { id: string, title: string, icon: string }[] = [
	{ id: 'user', title: 'User', icon: '' },
	{ id: 'admin', title: 'Administrator', icon: 'uk-icon-bolt' },
	{ id: 'hotel', title: 'Hotel manager', icon: 'uk-icon-building' }
]

export class User extends Model {
	static __api: string = 'user'

	email: string = ''
	roles: { id: string, title: string, icon: string }[] = []

	description: string = ''
	image: string = ''

	constructor(value: any = {}) {
		super(value)

		this.email = String(value.email || '')
		this.description = String(value.description || '')
		this.image = String(value.image || '')

		this.roles = value.roles instanceof Array && value.roles.reduce( ( prev, value) =>
			prev.concat(UserRoles.find( role => role.id === value)),
		[]).concat(UserRoles[0]).filter( (item, pos, self) => self.indexOf(item) == pos ) || [UserRoles[0]]
	}

	get icons(){
		return this.roles
					.reduce( (prev, value) => prev.concat(value.icon), [])
					.map(value => value.trim().toLowerCase())
					.filter(value => !!value)
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			email: this.email,
			roles: this.roles.reduce( (prev, value) => prev.concat(value.id), []),
			description: this.description || '',
			image: this.image
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
