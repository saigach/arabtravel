import { UUID } from './uuid'
import { User } from './user'

export class Model {
	static __api: string = ''

	id: UUID = new UUID()
	enable: boolean = true

	owner: User = null

	title: string = ''

	constructor(value: any = {}) {
		Object.assign(this, value)
		this.id = value.__id instanceof UUID && value.__id || new UUID(value.__id || null)
		this.enable = value.__enable === undefined ? true : !!value.__enable

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)
		else
			this.owner = null

		this.title = String(value.title || '')
	}

	toObject(): {} {
		return {
			id: this.id.toString(),
			enable: this.enable,
			owner: this.owner && this.owner.id.toString() || null,
			title: this.title,
		}
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}



