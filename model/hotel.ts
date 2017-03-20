import { newDate, Model, File, MLString, getAllUniqueCombinations } from './common'
import { User } from './user'

export class BeachDistance {
	static List:BeachDistance[] = [
		new BeachDistance({
			id: 'na',
			title: new MLString({
				en: '(not applicable)',
				ar: '(not applicable)'
			})}),
		new BeachDistance({
			id: 'on',
			title: new MLString({
				en: 'on the beach directly',
				ar: 'on the beach directly'
			})
		}),
		new BeachDistance({
			id: 'close',
			title: new MLString({
				en: 'area close by the beach',
				ar: 'area close by the beach'
			})
		})
	]

	static getBeachDistance(id: string = ''): BeachDistance {
		return BeachDistance.List.find( (value:BeachDistance) => value.id === id) || BeachDistance.List[0]
	}

	id: string
	title: MLString

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
	}
}

export class AllInclusive {
	static List:AllInclusive[] = [
		new AllInclusive({
			id: 'na',
			title: new MLString({
				en: '(not applicable)',
				ar: '(not applicable)'
			})}),
		new AllInclusive({
			id: 'fb',
			title: new MLString({
				en: 'Full Board',
				ar: 'Full Board'
			})
		}),
		new AllInclusive({
			id: 'hb',
			title: new MLString({
				en: 'Half Board',
				ar: 'Half Board'
			})
		}),
		new AllInclusive({
			id: 'bo',
			title: new MLString({
				en: 'Breakfast Only',
				ar: 'Breakfast Only'
			})
		})		
	]

	static getAllInclusive(id: string = ''): AllInclusive {
		return AllInclusive.List.find( (value:AllInclusive) => value.id === id) || AllInclusive.List[0]
	}

	id: string
	title: MLString

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
	}
}

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

	allInclusive: string
	
	costs: Cost[]

	constructor(value: any = {}) {
		this.title = new MLString(value.title)
		this.content = new MLString(value.content),
		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null
		this.allInclusive = value.allInclusive
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

	getMinumalCost(ages: number[] = []): number {

		const checkAges = (ages: number[], room: number[]) => {
			if (ages.length > room.length)
				return false

			let a = ages.slice().sort( (a, b) => b-a )
			let r = room.slice().sort( (a, b) => b-a )

			for (let i = 0; i < a.length; i++)
				if (a[i] < r[i])
					return false

			return true
		}

		return this.costs.reduce( (prev: number, line: Cost) => {
			if (!checkAges(ages, line.ages.slice().map( value => value.value )))
				return prev

			if (prev === null)
				return line.cost

			return Math.min(prev, line.cost)
		}, null)
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
	
	city: MLString
	location: MLString
	beach: string
	
	rating: number

	constructor(value: any = {}) {
		super(value)

		this.title = new MLString(value.title)
		this.description = new MLString(value.description)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.content = new MLString(value.content)
		this.city = new MLString(value.city)
		this.location = new MLString(value.location)
		this.beach = value.beach
		this.rating = value.rating

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

	getRoom(ages: number[] = []): { room: Room, cost: number } {
		return this.rooms.reduce( (prev: { room: Room, cost: number } , room: Room) => {
			let cost = room.getMinumalCost(ages)

			if (cost === null)
				return prev

			if (prev === null || prev.cost > cost)
				return { room: room, cost: cost }

			return prev
		}, null)
	}

	getVariants(ages: number[] = []): { room: Room, cost: number }[][] {
		return getAllUniqueCombinations(ages)
				.map( value => value.map( value => this.getRoom(value) ))
				.filter( value => value.reduce( (prev, value) => value === null ? false : prev, true )  )
	}

	getMinumalCost(ages: number[] = []): number {
		return this.getVariants(ages).reduce( (prev: number, variant: { room: Room, cost: number }[]) => {
			let sum = variant.reduce( (prev: number, value: { room: Room, cost: number }) => prev + value.cost, 0)

			if (prev === null)
				return sum

			return Math.min(prev, sum)
		}, null)
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			title: this.title,
			description: this.description,
			owner: this.owner && this.owner.id.uuid || null,
			content: this.content,
			city: this.city,
			location: this.location,
			beach: this.beach,
			rating: this.rating,
			rooms: this.rooms.reduce( (prev: {}[], value: Room) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}
}
