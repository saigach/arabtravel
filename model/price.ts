import { newDate } from './common'

import { Vehicle } from './vehicle'
import { AgeGroup } from './human'

export class VehicleCost {
	enable: boolean
	vehicle: Vehicle
	cost: number

	constructor(value: any = {}) {
		this.enable = value.enable === undefined ? true : Boolean(value.enable)
		this.vehicle = value.vehicle ? ( value.vehicle instanceof Vehicle ? value.vehicle : new Vehicle(value.vehicle) ) : null
		this.cost = Math.max( 0, Number.parseFloat(value.cost || 0) || 0 )
	}

	toObject(): {} {
		return {
			enable: this.enable,
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

export class Price {

	enable: boolean

	startDate: Date
	endDate: Date

	costs: Cost[] = AgeGroup.List.reduce( (prev: Cost[], ageGroup: AgeGroup) => prev.concat(new Cost(ageGroup)), [] )

	getCost(arg: AgeGroup | string): number {
		let cost = this.costs.find( (value:Cost) =>
			arg instanceof AgeGroup ? value.ageGroup.id === arg.id : value.ageGroup.id === arg
		)
		return cost && cost.cost || 0
	}

	vehicles: VehicleCost[] = []

	getVehicleCost(arg: Vehicle): number {
		let cost = this.vehicles.find( (value:VehicleCost) =>
			value.enable && value.vehicle.id.uuid === arg.id.uuid
		)
		return cost && cost.cost || 0
	}

	refunds: Refund[]

	constructor(value: any = {}) {
		this.enable = value.enable === undefined ? true : Boolean(value.enable)

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

		this.vehicles = value.vehicles instanceof Array ?
			value.vehicles.reduce(
				( prev: VehicleCost[] , value: any) =>
					value ? prev.concat( new VehicleCost(value)) : prev,
				[]
			) : []

		this.refunds = value.refund instanceof Array ?
			value.refund.reduce(
				( prev: Refund[] , value:any ) => prev.concat(new Refund(value)),
				[]
			) : []
	}

	toObject(): {} {
		return {
			enable: this.enable,
			startDate: this.startDate,
			endDate: this.endDate,
			costs: this.costs.reduce( (prev: {}[], value: Cost) => prev.concat(value.toObject()), []),
			vehicles: this.vehicles.reduce( (prev: {}[], value: VehicleCost) => prev.concat(value.toObject()), []),
			refunds: this.refunds.reduce( (prev: {}[], value: Refund) => prev.concat(value.toObject()), [])
		}
	}
}
