import { newDate, Model, File, MLString } from './common'

import { Point } from './point'
import { Hotel } from './hotel'
import { Price, Cost } from './price'

export class Package extends Model {
	static __api: string = 'objects/package'

	title: MLString
	description: MLString

	content: MLString

	pointA: Point
	pointB: Point

	image: File = null

	hotels: Hotel[] = []

	prices: Price[] = []

	get firstHotel(): Hotel {
		if (this.hotels.length <= 0)
			return null

		return this.hotels[0]
	}

	constructor(value: any = {}) {
		super(value)

		this.title = new MLString(value.title)
		this.description = new MLString(value.description)

		this.content = new MLString(value.content)

		this.pointA = value.pointA ? ( value.pointA instanceof Point ? value.pointA : new Point(value.pointA) ) : null
		this.pointB = value.pointB ? ( value.pointB instanceof Point ? value.pointB : new Point(value.pointB) ) : null

		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null

		this.hotels = value.hotels instanceof Array ?
			value.hotels.reduce(
				( prev: Hotel[] , value:any ) =>
					value ? prev.concat(value instanceof Hotel ? value : new Hotel(value) ) : prev,
				[]
			) : []

		this.prices = value.prices instanceof Array ?
			value.prices.reduce(
				( prev: Price[] , value:any ) =>
					value ? prev.concat(value instanceof Price ? value : new Price(value)) : prev,
				[]
			) : []
	}

	getPrice(date: Date = new Date()): Price {
		if (this.prices.length <= 0)
			return null

		let currentDate = Number(date)
		return this.prices.find( (value: Price) =>
			Number(value.startDate) <= currentDate &&
			Number(value.endDate) >= currentDate
		) || null
	}

	get basePrice(): number {
		let sum = 0

		let hotel = this.firstHotel

		if (hotel)
			sum += hotel.minimalCost

		let price = this.getPrice()

		if (price && price.costs.length > 0) {
			let cost = price.costs.find( (value:Cost) => value.ageGroup.id === 'adults' )
			sum += (cost ? cost.cost : price.costs[0].cost)
		}

		return sum
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			title: this.title,
			description: this.description,
			content: this.content,
			pointA: this.pointA.toObject(),
			pointB: this.pointB.toObject(),
			hotels: this.hotels.reduce( (prev: {}[], value: Hotel) => prev.concat(value.toObject()), []),
			prices: this.prices.reduce( (prev: {}[], value: Price) => prev.concat(value.toObject()), []),
			image: this.image && this.image.toObject() || null
		})
	}
}
