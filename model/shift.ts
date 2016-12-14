import { UUID } from './uuid'
import { Model } from './model'

import { Trip } from './trip'
import { Price } from './price'
import { Hotel } from './hotel'

const newDate = value => {
	if (value instanceof Date)
		return value

	let date = new Date(value)

	if ( !Number.isNaN( date.getTime() ) )
		return date

	return new Date()
}

export class Shift extends Model {
	static __api: string = ''

	date: Date = new Date()
	trip: Trip = null
	hotel: Hotel = null
	price: Price = null

	constructor(value: any = {}) {
		super(value)

		this.date = newDate(value.date)
		this.trip = value.trip instanceof Trip && value || value.trip && new Trip(value.trip) || null
		this.hotel = value.hotel instanceof Trip && value || value.hotel && new Trip(value.hotel) || null
		this.price = value.price instanceof Price && value || value.price && new Price(value.price) || null
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			date: this.date,
			trip: this.trip && this.trip.toObject() || null,
			hotel: this.hotel && this.hotel.toObject() || null,
			price: this.price && this.price.toObject() || null
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
