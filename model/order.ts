import { newDate, Model, File } from './common'
import { User } from './user'

import { Trip, Price } from './trip'
import { Human } from './human'
import { Hotel, Room } from './hotel'

class Shift {

	date: Date
	trip: Trip
	price: Price

	constructor(value: any = {}) {
		this.date = newDate(value.date) || newDate()
		this.trip = value.trip ? ( value.trip instanceof Trip ? value.trip : new Trip(value.trip) ) : null
		this.price = value.price ? ( value.price instanceof Price ? value.price : new Price(value.price) ) : null
	}

	toObject(): {} {
		return {
			date: this.date,
			trip: this.trip && this.trip.toObject() || null,
			price: this.price && this.price.toObject() || null
		}
	}
}

class HotelData {
	hotel: Hotel
	room: Room

	constructor(value: any = {}) {
		this.hotel = value.hotel ? (value.hotel instanceof Hotel ? value.hotel : new Hotel(value.hotel) ) : null
		this.room = value.room ? (value.room instanceof Room ? value.room : new Room(value.room) ) : null
	}

	toObject(): {} {
		return {
			hotel: this.hotel && this.hotel.toObject() || null,
			room: this.room && this.room.toObject() || null
		}
	}
}

export class PaymentType {
	static List:PaymentType[] = [
		new PaymentType( { id: 'card', title: 'Card', icon: null } ),
		new PaymentType( { id: 'bank', title: 'Bank transfer', icon: null } ),
		new PaymentType( { id: 'wu', title: 'Western Union', icon: null } )
	]

	static getPaymentType(id: string = ''): PaymentType {
		return PaymentType.List.find( (value:PaymentType) => value.id === id) || PaymentType.List[0]
	}

	id: string
	title: string
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = String(value.title || '')
		this.icon = String(value.icon || '')
	}
}

export class OrderStatus {
	static List:OrderStatus[] = [
		new OrderStatus( { id: 'new', title: 'New order', icon: null } ),
		new OrderStatus( { id: 'processing', title: 'Under processing', icon: null } ),
		new OrderStatus( { id: 'need-payment-confirm', title: 'Need payment confirm', icon: null } ),
		new OrderStatus( { id: 'confirmed', title: 'Confirmed', icon: null } ),
		new OrderStatus( { id: 'not-approved', title: 'Not approved', icon: null } ),
		new OrderStatus( { id: 'cancellation', title: 'Cancellation', icon: null } ),
		new OrderStatus( { id: 'canceled', title: 'Canceled', icon: null } )
	]

	static getOrderStatus(id: string = ''): OrderStatus {
		return OrderStatus.List.find( (value:OrderStatus) => value.id === id) || OrderStatus.List[0]
	}

	id: string
	title: string
	icon: string
	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = String(value.title || '')
		this.icon = String(value.icon || '')
	}
}

class Card {
	number: string
	cardholder: string
	validMonth: number
	validYear: number
	cvv: string

	constructor(value: any = {}) {
		this.number =  String(value.number || '')
		this.cardholder = String(value.cardholder || '')

		let month = Number.parseInt(value.validMonth || 0)

		this.validMonth =  month > 0 && month <= 12 && month || 1

		let year = Number.parseInt(value.validYear || 0)
		this.validYear = year > 2000 && year || new Date().getFullYear()

		this.cvv = String(value.cvv || '')
	}

	toObject(): {} {
		return {
			number: this.number,
			cardholder: this.cardholder,
			validMonth: this.validMonth,
			validYear: this.validYear,
			cvv: this.cvv
		}
	}
}

export class Order extends Model {
	static __api: string = 'object/order'
	static __primaryFields = Model.__primaryFields.concat(['owner', 'date', 'status'])

	owner: User = null

	date: Date

	shifts: Shift[]
	people: Human[]

	hotel: HotelData

	paymentType: PaymentType

	card: Card

	status: OrderStatus

	tickets: File[]

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.date = newDate(value.date || null)

		this.shifts = value.shifts instanceof Array ?
			value.shifts.reduce(
				( prev: Shift[] , value:any ) => {
					let shift = new Shift(value)
					if (!shift.date || !shift.trip || !shift.price)
						return prev
					return prev.concat(shift)
				}, []
			) : []

		this.people = value.people instanceof Array ?
			value.people.reduce(
				( prev: Human[] , value:any ) =>
					value ? prev.concat(value instanceof Human ? value : new Human(value)) : prev,
				[]
			) : []

		this.hotel = value.hotel ? new HotelData(value.hotel) : null

		this.paymentType = PaymentType.getPaymentType(value.paymentType || null)

		this.card = new Card(value.card || {})

		this.status = OrderStatus.getOrderStatus(value.status || null)

		this.tickets = value.tickets instanceof Array ?
			value.tickets.reduce(
				( prev: File[] , value:any ) =>
					value ? prev.concat(value instanceof File ? value : new File(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			owner: this.owner && this.owner.id.uuid || null,
			date: this.date,
			shifts: this.shifts.reduce( (prev: {}[], value: Shift) => prev.concat(value.toObject()), []),
			people: this.people.reduce( (prev: {}[], value: Human) => prev.concat(value.toObject()), []),
			hotel: this.hotel && this.hotel.toObject() || null,
			paymentType: this.paymentType.id,
			card: this.card.toObject(),
			status: this.status.id,
			tickets: this.tickets.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}


	// getAdultsCount(date: Date = new Date()): number {
	// 	return this.people.reduce( (prev: number, human: Human) =>
	// 		human.getAgeGroup(date) === 'adults' ? ++prev : prev,
	// 		0
	// 	)
	// }

	// getKidsCount(date: Date = new Date()): number {
	// 	return this.people.reduce( (prev: number, human: Human) =>
	// 		human.getAgeGroup(date) === 'kids' ? ++prev : prev,
	// 		0
	// 	)
	// }

	// getInfantsCount(date: Date = new Date()): number {
	// 	return this.people.reduce( (prev: number, human: Human) =>
	// 		human.getAgeGroup(date) === 'infants' ? ++prev : prev,
	// 		0
	// 	)
	// }

	// get ticketsCost(): number {
	// 	return this.shifts.reduce(
	// 		(prev: number, shift: Shift ) => {
	// 			prev += this.getAdultsCount(shift.date) * shift.price.adults
	// 			prev += this.getKidsCount(shift.date) * shift.price.kids
	// 			prev += this.getInfantsCount(shift.date) * shift.price.infants
	// 			return prev
	// 		},
	// 		0
	// 	)
	// }

	// get totalCost(): number {
	// 	return this.ticketsCost
	// }
}
