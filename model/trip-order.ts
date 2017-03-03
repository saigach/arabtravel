import { newDate } from './common'

import { Order, OrderType } from './order'
import { Trip, TripType } from './trip'
import { Price } from './price'
import { Vehicle } from './vehicle'
import { Human } from './human'

export class TripOrder extends Order {
	static __api: string = Order.__api

	trip: Trip
	vehicle: Vehicle

	people: Human[]

	constructor(value: any = {}) {
		super(value)

		this.type = OrderType.getOrderType('trip')

		this.trip = value.trip ? ( value.trip instanceof Trip ? value.trip : new Trip(value.trip) ) : null

		this.vehicle = value.vehicle ? ( value.vehicle instanceof Vehicle ? value.vehicle : new Vehicle(value.vehicle) ) : null

		this.people = value.people instanceof Array ?
			value.people.reduce(
				( prev: Human[] , value:any ) =>
					value ? prev.concat(value instanceof Human ? value : new Human(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			trip: this.trip && this.trip.toObject() || null,
			vehicle: this.vehicle && this.vehicle.toObject() || null,
			people: this.people.reduce( (prev: {}[], value: Human) => prev.concat(value.toObject()), [])
		})
	}

	get ages(): number[] {
		return this.people.reduce( (prev:number[], human: Human) => prev.concat(human.getAge(this.departureDate)), [] )
	}

	get cost(): number {
		if (!this.trip || !this.price)
			return 0

		let sum = this.ages.reduce( (prev: number, age: number) => prev + this.price.getCost(age), 0 )

		if (this.vehicle)
			sum += this.price.getCost(this.vehicle)

		return sum
	}

	get totalCost(): number {
		return this.cost + this.processingFee
	}
}
