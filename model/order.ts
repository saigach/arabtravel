
import { Model } from './model'
import { User } from './user'

import { Trip } from './trip'
import { Price } from './price'
import { Hotel } from './hotel'

import { Human } from './human'

const newDate = value => {
	if (value instanceof Date)
		return value

	let date = new Date(value)

	if ( !Number.isNaN( date.getTime() ) )
		return date

	return null
}

export class Order extends Model {
	static __api: string = 'objects/order'

	owner: User = null
	date: Date = new Date()

	shifts: {
		date: Date,
		trip: Trip,
		hotel: Hotel,
		price: Price
	}[] = []

	people: Human[] = []

	description: string = ''

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.date = value.dob && newDate(value.date) || new Date()

		this.shifts = value.shifts instanceof Array && value.shifts.reduce(
			( prev: { date: Date, trip: Trip, price: Price, hotel: Hotel }[] , value:any ) => {
				let date: Date = newDate(value.date)
				if (!date)
					return prev

				let trip: Trip = value.trip instanceof Trip && value || value.trip && new Trip(value.trip) || null
				if (!trip)
					return prev

				let hotel: Hotel = value.hotel instanceof Trip && value || value.hotel && new Trip(value.hotel) || null

				let price: Price = value.price instanceof Price && value || value.price && new Price(value.price) || null

				if (!price)
					return prev

				return prev.concat({date, trip, hotel, price})
			}, []
		).filter(value => !!value) || []

		this.people = value.people instanceof Array && value.people.reduce(
			( prev: Human[] , value:any ) =>
				prev.concat(value instanceof Human && value || value && new Human(value) || null),
			[]
		).filter(value => !!value) || []

		this.description = String(value.description || '')
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			owner: this.owner && this.owner.id.toString() || null,
			trips: this.shifts.reduce( (prev, value) => prev.concat({
				date: value.date,
				trip: value.trip.toObject(),
				hotel: value.hotel.toObject(),
				price: value.price.toObject()
			}), []),
			date: this.date,
			people: this.people.reduce( (prev, value) => prev.concat(value.toObject()), []),
			description: this.description || ''
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
