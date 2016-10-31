
import { Model } from './model'

export class Human extends Model {
	static __api: string = 'objects/human'

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
