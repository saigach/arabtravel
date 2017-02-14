import { newDate } from './common'

import { Order, PeopleCount, OrderType } from './order'
import { Trip, TripType } from './trip'
import { Price } from './price'
import { Vehicle } from './vehicle'

export class TripOrder extends Order {
	static __api: string = Order.__api

	trip: Trip
	vehicle: Vehicle

	constructor(value: any = {}) {
		super(value)

		this.type = OrderType.getOrderType('trip')

		this.trip = value.trip ? ( value.trip instanceof Trip ? value.trip : new Trip(value.trip) ) : null

		this.vehicle = value.vehicle ? ( value.vehicle instanceof Vehicle ? value.vehicle : new Vehicle(value.vehicle) ) : null
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			trip: this.trip && this.trip.toObject() || null,
			vehicle: this.vehicle && this.vehicle.toObject() || null
		})
	}

	get cost(): number {
		if (!this.trip || !this.price)
			return 0

		let sum = this.peopleCount.reduce( (prev: number, peopleCount:PeopleCount) =>
			prev + (this.price.getCost(peopleCount.ageGroup) * peopleCount.count),
			0
		)

		if (this.vehicle)
			sum += this.price.getVehicleCost(this.vehicle)

		return sum
	}

	get totalCost(): number {
		return this.cost + this.processingFee
	}
}
