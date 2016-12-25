import { newDate, Model, File } from './common'

import { Point } from './point'
import { Vehicle } from './vehicle'
import { Hotel } from './hotel'
import { AgeGroup } from './human'

class VehicleCost {
	vehicle: Vehicle
	cost: number

	constructor(value: any = {}) {
		this.vehicle = value.vehicle ? ( value.vehicle instanceof Vehicle ? value.vehicle : new Vehicle(value.vehicle) ) : null
		this.cost = Math.max( 0, Number.parseFloat(value.cost || 0) || 0 )
	}

	toObject(): {} {
		return {
			vehicle: this.vehicle.toObject(),
			cost: this.cost
		}
	}
}

export class Cost {
	ageGroup: AgeGroup = null
	cost: number

	constructor(ageGroup: AgeGroup, cost: number = 0) {
		this.ageGroup = ageGroup
		this.cost = cost
	}

	toObject(): {} {
		return {
			ageGroup: this.ageGroup.id,
			cost: this.cost
		}
	}
}

export class Refund {
	months: number
	days: number
	percent: number
	sum: number

	constructor(value: any = {}) {
		this.months = Math.max( 0, Number.parseInt(value.months || 0) || 0 )
		this.days = Math.max( 0, Math.min( Number.parseFloat(value.days || 0) || 0, 31 ) )
		this.percent = Math.max( 0, Math.min( Number.parseFloat(value.percent || 0) || 0, 100 ) )
		this.sum = Math.max( 0, Number.parseFloat(value.sum || 0) || 0 )
	}

	toObject(): {} {
		return {
			months: this.months,
			days: this.days,
			percent: this.percent,
			sum: this.sum
		}
	}
}

export class Price extends Model {

	startDate: Date
	endDate: Date

	costs: Cost[] = AgeGroup.List.reduce( (prev: Cost[], ageGroup: AgeGroup) => prev.concat(new Cost(ageGroup)), [] )

	refunds: Refund[]

	constructor(value: any = {}) {
		super(value)

		this.startDate = newDate(value.startDate || null)
		this.endDate = value.endDate && newDate(value.endDate) || (() => {
			let date = newDate(this.startDate)
			date.setFullYear(1 + date.getFullYear())
			return date
		})()

		if (value.costs && value.costs instanceof Array)
			this.costs.forEach( (costItem: Cost) => {
				let costData = value.costs.find( costData => costData.ageGroup === costItem.ageGroup.id )

				if (!costData)
					return

				costItem.cost = Math.max( 0, Number.parseFloat(costData.cost || 0) || 0 )
			} )

		this.refunds = value.refund instanceof Array ?
			value.refund.reduce(
				( prev: Refund[] , value:any ) => prev.concat(new Refund(value)),
				[]
			) : []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			startDate: this.startDate,
			endDate: this.endDate,
			costs: this.costs.reduce( (prev: {}[], value: Cost) => prev.concat(value.toObject()), []),
			refunds: this.refunds.reduce( (prev: {}[], value: Refund) => prev.concat(value.toObject()), [])
		})
	}
}

export class Trip extends Model {
	static __api: string = 'object/trip'
	static __primaryFields = Model.__primaryFields.concat(['package', 'pointA', 'pointB'])

	package: boolean

	content: string

	pointA: Point
	pointB: Point

	vehicles: VehicleCost[] = []

	hotels: Hotel[] = []
	images: File[] = []

	prices: Price[] = []

	constructor(value: any = {}) {
		super(value)

		this.package = value.package === undefined ? true : Boolean(value.package)

		this.content = String(value.content || '')

		this.pointA = value.pointA ? ( value.pointA instanceof Point ? value.pointA : new Point(value.pointA) ) : null
		this.pointB = value.pointB ? ( value.pointB instanceof Point ? value.pointB : new Point(value.pointB) ) : null

		this.vehicles = value.vehicles instanceof Array ?
			value.vehicles.reduce(
				( prev: VehicleCost[] , value: any) =>
					value ? prev.concat( new VehicleCost(value)) : prev,
				[]
			) : []

		this.hotels = value.hotels instanceof Array ?
			value.hotels.reduce(
				( prev: Hotel[] , value:any ) =>
					value ? prev.concat(value instanceof Hotel ? value : new Hotel(value) ) : prev,
				[]
			) : []

		this.images = value.images instanceof Array ?
			value.images.reduce(
				( prev: File[] , value:any ) =>
					value ? prev.concat(value instanceof File ? value : new File(value)) : prev,
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

		return this.prices[0]
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			package: this.package,
			content: this.content,
			pointA: this.pointA.toObject(),
			pointB: this.pointB.toObject(),
			vehicles: this.vehicles.reduce( (prev: {}[], value: VehicleCost) => prev.concat(value.toObject()), []),
			hotels: this.hotels.reduce( (prev: {}[], value: Hotel) => prev.concat(value.toObject()), []),
			prices: this.prices.reduce( (prev: {}[], value: Price) => prev.concat(value.toObject()), []),
			images: this.images.reduce( (prev: {}[], value: File) => prev.concat(value.toObject()), [])
		})
	}
}
