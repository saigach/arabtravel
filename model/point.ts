
import { Model, MLString } from './common'

export class Point extends Model {
	static __api: string = 'objects/point'

	title: MLString

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
