
import { Model } from './model'

export class Trip extends Model {
	static __api: string = 'objects/trip'

	description: string = ''

	constructor(value: any = {}) {
		super(value)

		this.description = String(value.description || '')
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description || ''
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
