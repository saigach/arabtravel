import { UUID } from './uuid'
import { Model } from './model'
import { Point } from './point'
import { Vehicle } from './vehicle'
import { Price } from './price'

export class Trip extends Model {
	static __api: string = 'objects/trip'

	description: string = ''

	pointA: Point = null
	pointB: Point = null

	vehicles: { vehicle: Vehicle, cost: 0 }[] = []

	prices: Price[] = []

	constructor(value: any = {}) {
		super(value)

		this.description = String(value.description || '')

		this.pointA = value.pointA && ( value.pointA instanceof Point ? value.pointA : new Point(value.pointA) ) || null
		this.pointB = value.pointB && ( value.pointB instanceof Point ? value.pointB : new Point(value.pointB) ) || null

		this.vehicles = value.vehicles instanceof Array && value.vehicles.reduce(
			( prev: { vehicle: Vehicle, cost: number}[] , value: any) =>
				prev.concat( value && value.vehicle && {
					vehicle: value.vehicle instanceof Vehicle && value.vehicle || new Vehicle(value.vehicle),
					cost: Number.parseFloat(value.cost || 0) || 0
				} || null),
			[]
		).filter(value => !!value) || []

		this.prices = value.prices instanceof Array && value.prices.reduce(
			( prev: Price[] , value:any ) =>
				prev.concat(value instanceof Price && value || value && new Price(value) || null),
			[]
		).filter(value => !!value) || []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description || '',
			pointA: this.pointA.toObject(),
			pointB: this.pointB.toObject(),
			vehicles: this.vehicles.reduce( (prev, value) => prev.concat({
				vehicle: value.vehicle.toObject(),
				cost: value.cost
			}), [] ),
			prices: this.prices.reduce( (prev, value) => prev.concat(value.toObject()), [])
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
