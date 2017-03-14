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

	image: File

	hotel: Hotel

	durations: number[]

	prices: Price[] = []

	constructor(value: any = {}) {
		super(value)

		this.title = new MLString(value.title)
		this.description = new MLString(value.description)

		this.content = new MLString(value.content)

		this.pointA = value.pointA ? ( value.pointA instanceof Point ? value.pointA : new Point(value.pointA) ) : null
		this.pointB = value.pointB ? ( value.pointB instanceof Point ? value.pointB : new Point(value.pointB) ) : null

		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null

		this.hotel = value.hotel ? (value.hotel instanceof Hotel ? value.hotel : new Hotel(value.hotel)) : null

		this.durations = value.durations instanceof Array ?
			value.durations.reduce(( prev: number[] , value: any) => prev.concat(parseInt(value)), [])
				.filter( (value, index, self) => value && value > 0 && self.indexOf(value) === index )
			: []

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

	get minimalDuration(): number {
		if (this.durations.length <= 0)
			return 1

		return Math.min(...this.durations)
	}

	getMinimalCost(date: Date = new Date(), ages: number[] = []): number {

		let sum = 0

		if (this.hotel)
			sum += this.hotel.getMinumalCost(ages) * this.minimalDuration

		let price = this.getPrice(date)
		if (price && price.costs.length > 0)
			sum += ages.reduce( (prev: number, age: number) => prev + price.getCost(age), 0 )

		return sum

	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			title: this.title,
			description: this.description,
			content: this.content,
			pointA: this.pointA && this.pointA.toObject() || null,
			pointB: this.pointB && this.pointB.toObject() || null,
			hotel: this.hotel && this.hotel.toObject() || null,
			durations: this.durations,
			prices: this.prices.reduce( (prev: {}[], value: Price) => prev.concat(value.toObject()), []),
			image: this.image && this.image.toObject() || null
		})
	}
}
