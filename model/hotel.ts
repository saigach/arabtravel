import { newDate, Model, File, MLString } from './common'
import { User } from './user'

export class Room {

	title: MLString
	content: MLString
	image: File

	costs: number[][] = [[]]

	constructor(value: any = {}) {
		this.title = new MLString(value.title)
		this.content = new MLString(value.content),
		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null

		let maxColumn = 2
		this.costs = value.costs instanceof Array ? value.costs.reduce((prev: number[][], value: any) => {
			let arr = value instanceof Array ? value.map(
				value => typeof value === 'number' ? Math.max( 0, value) : null
			) : []
			maxColumn = Math.max(maxColumn, arr.length)
			prev.push(arr)
			return prev
		}, [] ) : []

		if (this.costs.length <= 0)
			this.costs = [[]]

		this.costs = this.costs.map( value => value.concat(new Array(maxColumn - value.length)).map(value => value === undefined ? null : value) )
	}

	toObject(): {} {
		return {
			title: this.title,
			content: this.content,
			image: this.image && this.image.toObject() || null,
			costs: this.costs
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

	// options: Option[]

	// get enabledOptions(): Option[] {
	// 	return this.options.filter( (value:Option) => value.enable )
	// }

	// get optionsCost(): number {
	// 	return this.options.reduce( (prev: number, option: Option) =>
	// 		option.enable ? prev + option.cost : prev,
	// 		0
	// 	)
	// }

	// get roomsCost():number {
	// 	return this.rooms.reduce( (prev: number, room: Room) =>
	// 		prev + room.fullCost,
	// 		0
	// 	)
	// }

	// get fullCost(): number {
	// 	return this.roomsCost + this.optionsCost
	// }

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

		// this.options = value.options instanceof Array ?
		// 	value.options.reduce(
		// 		( prev: Option[] , value:any ) =>
		// 			value ? prev.concat(value instanceof Option ? value : new Option(value)) : prev,
		// 		[]
		// 	) : []
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			title: this.title,
			description: this.description,
			owner: this.owner && this.owner.id.uuid || null,
			content: this.content,
			rooms: this.rooms.reduce( (prev: {}[], value: Room) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
			// options: this.options.reduce( (prev: {}[], value: Option) => prev.concat(value.toObject()), [])
		})
	}

	getCost(ages: number[] = []): number {
		return 0
	}
}
