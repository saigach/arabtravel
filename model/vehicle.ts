
import { Model } from './model'

export class Vehicle extends Model {
	static __api: string = 'objects/vehicle'

	edited: boolean = false

	constructor(value: any = {}) {
		super(value)
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {

		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
