import { newDate } from './common'

import { Order, OrderType } from './order'
import { Package } from './package'
import { Hotel, Room } from './hotel'

const ONE_DAY = 24*60*60*1000

export class PackageOrder extends Order {
	static __api: string = Order.__api

	package: Package
	room: Room
	anyDate: boolean

	_duration: number = 1

	get duration(): number {
		if (this.package && this.package.durations.length > 0)
			return this.package.durations.sort((a, b) => a - b)
				.reduce( (prev: number, value: number) => value <= this._duration ? value : prev, 1)
		else
			this._duration
	}

	set duration(value: number) {
		this._duration = Math.max( 1, value)
	}


	constructor(value: any = {}) {
		super(value)

		this.type = OrderType.getOrderType('package')

		this.package = value.package ? ( value.package instanceof Package ? value.package : new Package(value.package) ) : null

		this.room = value.room ? (value.room instanceof Room ? value.room : new Room(value.room) ) : null

		this.anyDate = !!value.anyDate

		this.duration = value.duration || 1
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			package: this.package && this.package.toObject() || null,
			room: this.room && this.room.toObject() || null,
			anyDate: this.anyDate,
			duration: this.duration
		})
	}

	get returnDate(): Date {
		if (!this.departureDate)
			return null

		let date = new Date(this.departureDate)

		if (!this.package)
			return date

		date.setDate(date.getDate() + this.duration)

		return date
	}

	set returnDate(date: Date) { }

	get hotelCost(): number {
		if (!this.package || !this.package.hotel || !this.room)
			return 0

		return this.package.hotel.getCost(this.ages)
	}

	get roadCost(): number {
		if (!this.price)
			return 0

		return this.ages.reduce( (prev: number, age: number) => prev + this.price.getCost(age) )
	}

	get cost(): number {
		return this.roadCost + this.hotelCost
	}

	get totalCost(): number {
		return this.cost + this.processingFee
	}

}
