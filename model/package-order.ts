import { newDate } from './common'

import { Order, PeopleCount } from './order'
import { Package } from './package'
import { Price } from './price'
import { Hotel, Room } from './hotel'

const ONE_DAY = 24*60*60*1000

export class PackageOrder extends Order {
	static __api: string = Order.__api

	package: Package
	price: Price

	hotel: Hotel
	room: Room

	departureDate: Date
	returnDate: Date

	constructor(value: any = {}) {
		super(value)

		this.package = value.package ? ( value.package instanceof Package ? value.package : new Package(value.package) ) : null
		this.price = value.price ? ( value.price instanceof Price ? value.price : new Price(value.price) ) : null

		this.hotel = value.hotel ? (value.hotel instanceof Hotel ? value.hotel : new Hotel(value.hotel) ) : null
		this.room = value.room ? (value.room instanceof Room ? value.room : new Room(value.room) ) : null

		this.departureDate = newDate(value.departureDate) || newDate()
		this.returnDate = newDate(value.returnDate) || newDate()
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			package: this.package && this.package.toObject() || null,
			price: this.price && this.price.toObject() || null,
			hotel: this.hotel && this.hotel.toObject() || null,
			room: this.hotel && this.room && this.room.toObject() || null,
			departureDate: this.departureDate,
			returnDate: this.returnDate
		})
	}

	get duration(): number {
		if (!this.departureDate || !this.returnDate)
			return 1

		return Math.round( Math.abs( ( this.departureDate.getTime() - this.returnDate.getTime() ) / ONE_DAY ) ) || 1
	}

	get hotelCost(): number {
		return (this.hotel ? this.hotel.optionsCost : 0)
				+ (this.room ? this.room.fullCost * this.duration : 0)
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
