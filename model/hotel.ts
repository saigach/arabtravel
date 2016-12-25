import { newDate, Model, File } from './common'
import { User } from './user'

class Price {

	startDate: Date
	endDate: Date

	cost: number

	constructor(value: any = {}) {

		this.startDate = newDate(value.startDate || null)
		this.endDate = value.endDate && newDate(value.endDate) || (() => {
			let date = newDate(this.startDate)
			date.setFullYear(1 + date.getFullYear())
			return date
		})()

		this.cost = Math.max( 0, Number.parseFloat(value.cost || 0) || 0 )
	}

	toObject(): {} {
		return {
			startDate: this.startDate,
			endDate: this.endDate,
			cost: this.cost
		}
	}
}

export class Room extends Model {

	title: string
	content: string

	images: File[]
	prices: Price[]

	constructor(value: any = {}) {
		super(value)

		this.content = String(value.content || '')

		this.images = value.images instanceof Array ?
			value.images.reduce(
				( prev: File[] , value:any ) =>
					value ? prev.concat(value instanceof File ? value : new File(value)) : prev,
				[]
			) : []

		this.prices = value.prices instanceof Array ?
			value.prices.reduce(
				( prev: Price[] , value:any ) =>
					value ? prev.concat(value instanceof Price ? value : new Price(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			content: this.content,
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), []),
			prices: this.prices.reduce( (prev: {}[], value: Price) => prev.concat(value.toObject()), [])
		})
	}
}

export class Hotel extends Model {
	static __api: string = 'object/hotel'
	static __primaryFields = Model.__primaryFields.concat(['owner'])

	owner: User = null

	content: string

	rooms: Room[]
	images: File[]

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.content = String(value.content || '')

		this.rooms = value.rooms instanceof Array ?
			value.rooms.reduce(
				( prev: Room[] , value:any ) =>
					value ? prev.concat(value instanceof Room ? value : new Room(value)) : prev,
				[]
			) : []

		this.images = value.images instanceof Array ?
			value.images.reduce(
				( prev: File[] , value:any ) =>
					value ? prev.concat(value instanceof File ? value : new File(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			owner: this.owner && this.owner.id.uuid || null,
			content: this.content,
			rooms: this.rooms.reduce( (prev: {}[], value: Room) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}
}
