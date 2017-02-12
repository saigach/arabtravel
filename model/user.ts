import { Model, File, MLString } from './common'

export class Role {
	static List: Role[] = [
		new Role( { id: 'user', title: 'User', icon: null } ),
		new Role( { id: 'admin', title: 'Administrator', icon: 'uk-icon-bolt' } ),
		new Role( { id: 'hotel', title: 'Hotel manager', icon: 'uk-icon-building' } )
	]

	static getRole(id: string): Role {
		return Role.List.find( (value:Role) => value.id === id) || Role.List[0]
	}

	id: string
	title: string
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = String(value.title || '')
		this.icon = String(value.icon || '')
	}
}

export class User extends Model {
	static __api: string = 'user'

	title: string
	description: string

	email: string
	phone: string

	roles: Role[]

	image: File

	constructor(value: any = {}) {
		super(value)

		this.title = String(value.title || '')
		this.description = String(value.description || '')

		this.email = String(value.email || '')
		this.phone = String(value.phone || '')

		this.roles = [ Role.List[0] ]

		if (value.roles && value.roles instanceof Array)
			this.roles = this.roles.concat(value.roles.reduce(
				( prev: Role[] , value: string) => {
					let role = Role.getRole(value)
					return role ? prev.concat(role) : prev
				}, []
			)).filter( (item, pos, self) => self.indexOf(item) == pos )

		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			title: this.title,
			description: this.description,
			phone: this.phone,
			email: this.email,
			roles: this.roles.reduce( (prev: string[], value: Role) => prev.concat(value.id), []),
			image: this.image && this.image.toObject() || null
		})
	}
}
