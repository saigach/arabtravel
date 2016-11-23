
import { Model } from './model'
import { User } from './user'

export class Order extends Model {
	static __api: string = 'objects/order'

	description: string = ''
	owner: User = null

	constructor(value: any = {}) {
		super(value)

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
