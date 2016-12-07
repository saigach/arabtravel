
import { Model } from './model'
import { User } from './user'
import { Trip } from './trip'
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

	trip: Trip = null

	date: Date = new Date()

	people: Human[] = []

	description: string = ''

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		if (value.trip && value.trip instanceof Trip)
			this.trip = value.trip
		else if (value.trip && value.trip.id)
			this.trip = new Trip(value.trip)

		this.date = value.dob && newDate(value.date) || new Date()
		if (this.date)
			this.date.setHours(0,0,0,0)

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
			trip: this.trip && this.trip.toObject() || null,
			date: this.date,
			people: this.people.reduce( (prev, value) => prev.concat(value.toObject()), []),
			description: this.description || ''
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
