import { newDate, Model, File, MLString } from './common'
import { User } from './user'

export class Cost {
	ages: { value: number }[]
	cost: number

	constructor(value: any = {}) {
		this.ages = value.ages instanceof Array ?
						value.ages.map( value => ({ value: Math.max( 0, Number.parseFloat(value || 0) || 0)  }) ) :
						[]

		if (this.ages.length <= 0)
			this.ages = [{value: 0}]

		this.cost = Math.max(0, Number.parseFloat(value.cost || 0) || 0)
	}

	toObject(): {} {
		return {
			ages: this.ages.map( value => value.value ),
			cost: this.cost
		}
	}
}

export class Room {

	title: MLString
	content: MLString
	image: File

	costs: Cost[]

	constructor(value: any = {}) {
		this.title = new MLString(value.title)
		this.content = new MLString(value.content),
		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null

		this.costs = value.costs instanceof Array ?
			value.costs.reduce(
				( prev: Cost[] , value:any ) =>
					value ? prev.concat(value instanceof Cost ? value : new Cost(value)) : prev,
				[]
			) : []
	}

	toObject(): {} {
		return {
			title: this.title,
			content: this.content,
			image: this.image && this.image.toObject() || null,
			costs: this.costs.reduce( (prev: {}[], value: Cost) => prev.concat(value.toObject()), [])
		}
	}

	getCost(ages: number[] = []): number {
		return 0
	}
}

export class Hotel extends Model {
	static __api: string = 'objects/hotel'

	title: MLString
	description: MLString

	owner: User = null

	content: MLString

	rooms: Room[]
	images: File[]

	constructor(value: any = {}) {
		super(value)

		this.title = new MLString(value.title)
		this.description = new MLString(value.description)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.content = new MLString(value.content)

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
			title: this.title,
			description: this.description,
			owner: this.owner && this.owner.id.uuid || null,
			content: this.content,
			rooms: this.rooms.reduce( (prev: {}[], value: Room) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}
}
