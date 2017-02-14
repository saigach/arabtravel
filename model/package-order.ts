import { newDate } from './common'

import { Order, PeopleCount, OrderType } from './order'
import { Package } from './package'
import { Hotel, Room } from './hotel'

const ONE_DAY = 24*60*60*1000

export class PackageOrder extends Order {
	static __api: string = Order.__api

	package: Package
	room: Room

	anyDate: boolean

	constructor(value: any = {}) {
		super(value)

		this.type = OrderType.getOrderType('package')

		this.package = value.package ? ( value.package instanceof Package ? value.package : new Package(value.package) ) : null

		this.room = value.room ? (value.room instanceof Room ? value.room : new Room(value.room) ) : null

		this.anyDate = !!value.anyDate
	}

	get returnDate(): Date {
		if (!this.departureDate)
			return null

		let date = new Date(this.departureDate)

		if (!this.package)
			return date

		date.setDate(date.getDate() + this.package.duration)

		return date
	}

	set returnDate(date: Date) {

	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			package: this.package && this.package.toObject() || null,
			room: this.room && this.room.toObject() || null,
			anyDate: this.anyDate
		})
	}

	get hotelCost(): number {
		if (!this.package)
			return 0

		return (this.package.hotel ? this.package.hotel.optionsCost : 0)
				+ (this.room ? this.room.fullCost * this.package.duration : 0)
	}

	get roadCost(): number {
		if (!this.price)
			return 0

		return this.peopleCount.reduce( (prev: number, peopleCount:PeopleCount) =>
			prev + (this.price.getCost(peopleCount.ageGroup) * peopleCount.count),
			0
		)
	}

	get cost(): number {
		return this.roadCost + this.hotelCost
	}

	get totalCost(): number {
		return this.cost + this.processingFee
	}

}
