import { UUID } from './uuid'
import { Model } from './model'
import { User } from './user'

export class Hotel extends Model {
	static __api: string = 'objects/hotel'

	owner: User = null
	description: string = ''

	images: UUID[] = []

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.description = String(value.description || '')

		this.images = value.images instanceof Array && value.images.reduce(
			( prev: UUID[] , value:any ) =>
				prev.concat(value instanceof UUID && value || value && new UUID(value) || null),
			[]
		).filter(value => !!value) || []
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
