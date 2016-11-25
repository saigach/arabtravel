
import { Model } from './model'

export class Point extends Model {
	static __api: string = 'objects/point'

	latitude: number = 0
	longitude: number = 0

	edited: boolean = false

	constructor(value: any = {}) {
		super(value)

		this.latitude = Number.parseInt(value.latitude || 0)
		this.longitude = Number.parseInt(value.longitude || 0)
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			latitude: this.latitude,
			longitude: this.longitude
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
