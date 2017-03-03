import { newDate, Model, MLString } from './common'

import { Point } from './point'
import { Price } from './price'

export class TripType {
	static List:TripType[] = [
		new TripType({
			id: 'oneway',
			title: new MLString({
				en: 'One Way',
				ar: 'اتجاه واحد'
			}),
			icon: 'uk-icon-long-arrow-right',
			letter: '→'
		}),
		new TripType({
			id: 'twoway',
			title: new MLString({
				en: 'Two Way',
				ar: 'اتجاهين'
			}),
			icon: 'uk-icon-exchange',
			letter: '↔'
		})
	]

	static getTripType(id: string = ''): TripType {
		return TripType.List.find( (value:TripType) => value.id === id) || TripType.List[0]
	}

	id: string
	title: MLString
	icon: string
	letter: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
		this.icon = String(value.icon || '')
		this.letter = String(value.letter || '')
	}
}

export class Trip extends Model {
	static __api: string = 'objects/trip'

	description: MLString

	type: TripType

	pointA: Point
	pointB: Point

	departureTime: Date
	returnTime: Date

	content: MLString

	prices: Price[] = []

	get title(): string {
		return (this.pointA && this.pointA.title['en'] || 'A') + ' ' + (this.type.letter) + ' ' + (this.pointB && this.pointB.title['en'] || 'B') + ' (' + this.description['en'] + ')'
	}

	constructor(value: any = {}) {
		super(value)

		this.description = new MLString(value.description)

		this.type = TripType.getTripType(value.type || null)

		this.pointA = value.pointA ? ( value.pointA instanceof Point ? value.pointA : new Point(value.pointA) ) : null
		this.pointB = value.pointB ? ( value.pointB instanceof Point ? value.pointB : new Point(value.pointB) ) : null

		this.departureTime = value.departureTime && new Date(value.departureTime) || newDate()
		this.returnTime = value.returnTime && new Date(value.returnTime) || newDate()

		this.content = new MLString(value.content)

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

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description,
			type: this.type.id,
			pointA: this.pointA.toObject(),
			pointB: this.pointB.toObject(),
			departureTime: this.departureTime,
			returnTime: this.returnTime,
			content: this.content,
			prices: this.prices.reduce( (prev: {}[], value: Price) => prev.concat(value.toObject()), [])
		})
	}
}
