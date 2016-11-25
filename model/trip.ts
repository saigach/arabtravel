import { UUID } from './uuid'
import { Model } from './model'
import { Point } from './point'
import { Price } from './price'

import { Hotel } from './hotel'

export const TripType: { id: string, title: string, icon: string, maxPoints: number }[] = [
	{ id: 'oneway', title: 'One way trip', icon: 'uk-icon-long-arrow-right', maxPoints: 2 },
	{ id: 'twoway', title: 'Two way trip', icon: 'uk-icon-exchange', maxPoints: 2 },
	{ id: 'package', title: 'Package', icon: 'uk-icon-refresh', maxPoints: null },
]

export class Trip extends Model {
	static __api: string = 'objects/trip'

	description: string = ''

	type: { id: string, title: string, icon: string, maxPoints: number } = TripType[0]

	points: Point[] = []
	prices: Price[] = []
	images: UUID[] = []

	hotels: UUID[] = []

	constructor(value: any = {}) {
		super(value)

		this.description = String(value.description || '')

		this.type = value.type && TripType.find( type => type.id === value.type) || TripType[0]

		this.points = value.points instanceof Array && value.points.reduce(
			( prev: Point[] , value:any ) =>
				prev.concat(value instanceof Point && value || value && new Point(value) || null),
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

		this.hotels = value.hotels instanceof Array && value.hotels.reduce(
			( prev: UUID[] , value:any ) =>
				prev.concat(value instanceof UUID && value || value && new UUID(value) || null),
			[]
		).filter(value => !!value) || []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description || '',
			type: this.type.id,
			points: this.points.reduce( (prev, value) => prev.concat(value.toObject()), []),
			prices: this.prices.reduce( (prev, value) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev, value) => prev.concat(value.toString()), []),
			hotels: this.hotels.reduce( (prev, value) => prev.concat(value.toString()), [])
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
