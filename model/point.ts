
import { Model } from './common'

export class Point extends Model {
	static __api: string = 'object/point'
	static __primaryFields = Model.__primaryFields.concat(['latitude', 'longitude'])

	latitude: number
	longitude: number

	edited: boolean = false

	constructor(value: any = {}) {
		super(value)

		this.latitude = Number.parseInt(value.latitude) || 0
		this.longitude = Number.parseInt(value.longitude) || 0
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			latitude: this.latitude,
			longitude: this.longitude
		})
	}
}
