
import { Model } from './common'

export class Vehicle extends Model {
	static __api: string = 'object/vehicle'

	edited: boolean = false

	constructor(value: any = {}) {
		super(value)
	}
}
