import { newDate } from './common'
import { Vehicle } from './vehicle'

export class Cost {
	key: Vehicle | number
	cost: number

	constructor(value: any = {}) {
		this.key = typeof value.key === 'object' ?
						(value.key instanceof Vehicle ? value.key : new Vehicle(value.key)) :
						Math.max( 0, Number.parseInt(value.key || 0) || 0 )

		this.cost = Math.max( 0, Number.parseFloat(value.cost || 0) || 0 )
	}

	toObject(): {} {
		return {
			key: this.key instanceof Vehicle ? this.key.toObject() : this.key,
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
	startDate: Date
	endDate: Date

	costs: Cost[] = []
	refunds: Refund[]

	getCost(arg: number | Vehicle ): number {
		if (arg instanceof Vehicle) {
			let cost = this.costs
						.find((value:Cost) => value.key instanceof Vehicle ? value.key.id.equal(arg.id) : false)
			return cost && cost.cost || 0
		} else if (typeof arg === 'number') {
			return this.costs.sort((a:Cost, b:Cost) => a.cost - b.cost).reduce(
				(prev: number, value:Cost) => typeof value.key === 'number' &&
													(value.key === 0 || value.key < arg) ? value.cost : prev,
				0
			)
		} else {
			return 0
		}
	}

	constructor(value: any = {}) {
		this.startDate = newDate(value.startDate || null)
		this.endDate = value.endDate && newDate(value.endDate) || (() => {
			let date = newDate(this.startDate)
			date.setFullYear(1 + date.getFullYear())
			return date
		})()

		this.costs = value.costs instanceof Array ?
			value.costs.reduce(( prev: Cost[] , value: any) => value ? prev.concat( new Cost(value)) : prev, []) : []

		this.refunds = value.refund instanceof Array ?
			value.refund.reduce(( prev: Refund[] , value:any ) => prev.concat(new Refund(value)), []) : []
	}

	toObject(): {} {
		return {
			startDate: this.startDate,
			endDate: this.endDate,
			costs: this.costs.reduce( (prev: {}[], value: Cost) => prev.concat(value.toObject()), []),
			refunds: this.refunds.reduce( (prev: {}[], value: Refund) => prev.concat(value.toObject()), [])
		}
	}
}
