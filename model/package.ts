import { UUID } from './uuid'
import { Model } from './model'

import { Trip } from './trip'
import { Hotel } from './hotel'
import { Price } from './price'

export class Package extends Model {
	static __api: string = 'objects/package'

	description: string = ''

	trips: Trip[] = []
	hotels: Hotel[] = []
	prices: Price[] = []
	images: UUID[] = []

	constructor(value: any = {}) {
		super(value)

		this.description = String(value.description || '')

		this.trips = value.trips instanceof Array && value.trips.reduce(
			( prev: Trip[] , value:any ) =>
				prev.concat(value instanceof Trip && value || value && new Trip(value) || null),
			[]
		).filter(value => !!value) || []

		this.hotels = value.hotels instanceof Array && value.hotels.reduce(
			( prev: Hotel[] , value:any ) =>
				prev.concat(value instanceof Hotel && value || value && new Hotel(value) || null),
			[]
		).filter(value => !!value) || []

		this.prices = value.prices instanceof Array && value.prices.reduce(
			( prev: Price[] , value:any ) =>
				prev.concat(value instanceof Price && value || value && new Price(value) || null),
			[]
		).filter(value => !!value) || []

		this.images = value.images instanceof Array && value.images.reduce(
			( prev: UUID[] , value:any ) =>
				prev.concat(value instanceof UUID && value || value && new UUID(value) || null),
			[]
		).filter(value => !!value) || []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description || '',
			trips: this.trips.reduce( (prev, value) => prev.concat(value.toObject()), []),
			hotels: this.hotels.reduce( (prev, value) => prev.concat(value.toObject()), []),
			prices: this.prices.reduce( (prev, value) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev, value) => prev.concat(value.toString()), [])
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
