
import { Model } from './model'
import { User } from './user'

export class Hotel extends Model {
	static __api: string = 'objects/hotel'

	owner: User = null
	description: string = ''

	constructor(value: any = {}) {
		super(value)

		// if (!value.owner)
		// 	this.owner = null
		// else {
		// 	console.dir(value.owner)
		// 	this.owner = value.owner instanceof User && value.owner || value.owner.id && new User(value.owner) || null
		// }

		this.description = String(value.description || '')
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			owner: this.owner && this.owner.id.toString() || null,
			description: this.description || ''
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
