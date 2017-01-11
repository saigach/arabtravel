import { newDate, Model, File } from './common'
import { User } from './user'

export class Option {
	enable: boolean
	title: string
	cost: number

	constructor(value: any = {}) {
		this.enable = !!value.enable
		this.title = String(value.title || '')
		this.cost = Math.max( 0, Number.parseFloat(value.cost || 0) || 0 )
	}

	toObject(): {} {
		return {
			enable: this.enable,
			title: this.title,
			cost: this.cost,
		}
	}
}

export class Room {

	title: string
	size: number
	beds: number
	cost: number
	content: string

	options: Option[]

	get enabledOptions(): Option[] {
		return this.options.filter( (value:Option) => value.enable )
	}

	get optionsCost(): number {
		return this.options.reduce( (prev: number, option: Option) =>
			option.enable ? prev + option.cost : prev,
			0
		)
	}

	get fullCost(): number {
		return this.cost + this.optionsCost
	}

	constructor(value: any = {}) {
		this.title = String(value.title || '')
		this.size = Math.max( 1, Number.parseInt(value.size || 0) || 0 )
		this.beds = Math.max( 1, Number.parseInt(value.beds || 0) || 0 )
		this.cost = Math.max( 0, Number.parseFloat(value.cost || 0) || 0 )
		this.content = String(value.content || ''),
		this.options = value.options instanceof Array ?
			value.options.reduce(
				( prev: Option[] , value:any ) =>
					value ? prev.concat(value instanceof Option ? value : new Option(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return {
			title: this.title,
			size: this.size,
			beds: this.beds,
			cost: this.cost,
			content: this.content,
			options: this.options.reduce( (prev: {}[], value: Option) => prev.concat(value.toObject()), [])
		}
	}
}

export class Hotel extends Model {
	static __api: string = 'objects/hotel'
	static __primaryFields = Model.__primaryFields.concat(['owner'])

	owner: User = null

	content: string

	rooms: Room[]
	images: File[]

	options: Option[]

	get enabledOptions(): Option[] {
		return this.options.filter( (value:Option) => value.enable )
	}

	get optionsCost(): number {
		return this.options.reduce( (prev: number, option: Option) =>
			option.enable ? prev + option.cost : prev,
			0
		)
	}

	get roomsCost():number {
		return this.rooms.reduce( (prev: number, room: Room) =>
			prev + room.fullCost,
			0
		)
	}

	get fullCost(): number {
		return this.roomsCost + this.optionsCost
	}

	get minimalCost(): number {
		return this.rooms.reduce( (prev: number, room: Room) =>
			prev > 0 ? Math.min(room.cost, prev) : room.cost,
			0
		)
	}

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

		this.options = value.options instanceof Array ?
			value.options.reduce(
				( prev: Option[] , value:any ) =>
					value ? prev.concat(value instanceof Option ? value : new Option(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			owner: this.owner && this.owner.id.uuid || null,
			content: this.content,
			rooms: this.rooms.reduce( (prev: {}[], value: Room) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), []),
			options: this.options.reduce( (prev: {}[], value: Option) => prev.concat(value.toObject()), [])
		})
	}
}
