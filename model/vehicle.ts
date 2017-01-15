
import { Model, MLString } from './common'

export class Vehicle extends Model {
	static __api: string = 'objects/vehicle'

	title: MLString

	edited: boolean = false

	constructor(value: any = {}) {
		super(value)

		this.title = new MLString(value.title)
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			title: this.title
		})
	}
}
