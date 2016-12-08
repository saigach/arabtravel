import { UUID } from './uuid'
import { Model } from './model'

import { Point } from './point'
import { Hotel } from './hotel'
import { Price } from './price'

export class Package extends Model {
	static __api: string = 'objects/package'

	description: string = ''

	pointA: Point = null
	pointB: Point = null

	hotels: Hotel[] = []
	prices: Price[] = []
	images: UUID[] = []

	constructor(value: any = {}) {
		super(value)

		this.description = String(value.description || '')

		this.pointA = value.pointA && ( value.pointA instanceof Point ? value.pointA : new Point(value.pointA) ) || null
		this.pointB = value.pointB && ( value.pointB instanceof Point ? value.pointB : new Point(value.pointB) ) || null

		this.hotels = value.hotels instanceof Array && value.hotels.reduce(
			( prev: Hotel[] , value:any ) =>
				prev.concat(value instanceof Hotel && value || value && new Hotel(value) || null),
			[]
		).filter(value => !!value) || []

		this.prices = value.prices instanceof Array && value.prices.reduce(
			( prev: Price[] , value:any ) =>
				prev.concat(value instanceof Price && value || value && new Price(value) || null),
			[]
		).filter(value => !!value) || []

		this.images = value.images instanceof Array && value.images.reduce(
			( prev: UUID[] , value:any ) =>
				prev.concat(value instanceof UUID && value || value && new UUID(value) || null),
			[]
		).filter(value => !!value) || []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description || '',
			pointA: this.pointA.toObject(),
			pointB: this.pointB.toObject(),
			hotels: this.hotels.reduce( (prev, value) => prev.concat(value.toObject()), []),
			prices: this.prices.reduce( (prev, value) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev, value) => prev.concat(value.toString()), [])
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
