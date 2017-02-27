import { newDate } from './common'

import { Order, OrderType } from './order'
import { Package } from './package'
import { Hotel, Room } from './hotel'
import { Human } from './human'

const ONE_DAY = 24*60*60*1000

export class PeolpeInRoom {
	room: Room
	people: Human[]

	constructor(value: any = {}) {
		this.room = value.room ? ( value.room instanceof Room ? value.room : new Package(value.room) ) : null

		this.people = value.people instanceof Array ?
			value.people.reduce(
				( prev: Human[] , value:any ) =>
					value ? prev.concat(value instanceof Human ? value : new Human(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return {
			room: this.room && this.room.toObject() || null,
			people: this.people.reduce( (prev: {}[], value: Human) => prev.concat(value.toObject()), [])
		}
	}

	getAges(date = new Date()): number[] {
		return this.people.reduce( (prev:number[], human:Human) => prev.concat( human.getAge(date) ), [])
	}

}

export class PackageOrder extends Order {
	static __api: string = Order.__api

	package: Package
	peopleInRoom: PeolpeInRoom[]
	anyDate: boolean

	_duration: number = 1

	get duration(): number {
		if (this.package && this.package.durations.length > 0)
			return this.package.durations.sort((a, b) => a - b)
				.reduce( (prev: number, value: number) => value <= this._duration ? value : prev, 1)

		return this._duration
	}

	set duration(value: number) {
		this._duration = Math.max( 1, value)
	}


	constructor(value: any = {}) {
		super(value)

		this.type = OrderType.getOrderType('package')

		this.package = value.package ? ( value.package instanceof Package ? value.package : new Package(value.package) ) : null

		this.peopleInRoom = value.peopleInRoom instanceof Array ?
			value.peopleInRoom.reduce(
				( prev: PeolpeInRoom[] , value:any ) =>
					value ? prev.concat(value instanceof PeolpeInRoom ? value : new PeolpeInRoom(value)) : prev,
				[]
			) : []

		this.anyDate = !!value.anyDate

		this.duration = Number.parseInt(value.duration) || 1
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			package: this.package && this.package.toObject() || null,
			people: this.peopleInRoom.reduce( (prev: {}[], value: PeolpeInRoom) => prev.concat(value.toObject()), []),
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

	get ages(): number[] {
		return this.peopleInRoom.reduce(
			(prev:number[], peopleInRoom: PeolpeInRoom) => prev.concat(peopleInRoom.getAges(this.departureDate)),
			[]
		)
	}

	get roadCost(): number {
		if (!this.price)
			return 0

		return this.ages.reduce( (prev: number, age: number) => prev + this.price.getCost(age), 0 )
	}

	get hotelCost(): number {
		// if (!this.package || !this.package.hotel || !this.room)
			// return 0

		return 0
		// return this.package.hotel.getCost(this.ages)
	}

	get cost(): number {
		return this.roadCost + this.hotelCost
	}

	get totalCost(): number {
		return this.cost + this.processingFee
	}

}
