
import { Model } from './common'

export class Vehicle extends Model {
	static __api: string = 'objects/vehicle'

	edited: boolean = false

	constructor(value: any = {}) {
		super(value)
	}
}
