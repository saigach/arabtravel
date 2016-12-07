import { UUID } from './uuid'
import { Model } from './model'

const newDate = value => {
	if (value instanceof Date)
		return value

	let date = new Date(value)

	if ( !Number.isNaN( date.getTime() ) )
		return date

	return null
}

export class Price extends Model {
	static __api: string = ''

	startDate: Date = new Date()
	endDate: Date = null

	costs: { age: number, cost: number }[] = []
	changes: { factor: string, percent: number, cost: number }[]
	refund: { interval: number, percent: number, cost: number }[]

	constructor(value: any = {}) {
		super(value)

		this.startDate = value.startDate && newDate(value.startDate) || new Date()
		if (this.startDate)
			this.startDate.setHours(0,0,0,0)

		this.endDate = value.endDate && newDate(value.endDate) || (() => {
			let date = new Date()
			date.setFullYear(1 + date.getFullYear())
			return date
		})()

		if (this.endDate)
			this.endDate.setHours(0,0,0,0)

		this.costs = value.costs instanceof Array && value.costs.reduce(
			( prev: { age: number, cost: number }[] , value:any ) =>
				prev.concat({
					age: Number.parseInt(value.age || 0),
					cost: Math.max(0, Number.parseFloat(value.cost || 0))
				}),
			[]
		) || []

		this.changes = value.changes instanceof Array && value.changes.reduce(
			( prev: { factor: string, percent: number, cost: number }[] , value:any ) =>
				prev.concat({
					factor: String(value.factor || ''),
					percent: Math.max( 0, Math.min( Number.parseFloat(value.percent || 0), 1 ) ),
					cost: Math.max(0, Number.parseFloat(value.coast || 0))
				}),
			[]
		) || []

		this.refund = value.refund instanceof Array && value.refund.reduce(
			( prev: { interval: number, percent: number, cost: number }[] , value:any ) =>
				prev.concat({
					interval: Number.parseInt(value.interval || 0),
					percent: Math.max( 0, Math.min( Number.parseFloat(value.percent || 0), 1 ) ),
					cost: Math.max(0, Number.parseFloat(value.coast || 0))
				}),
			[]
		) || []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			startDate: this.startDate,
			endDate: this.endDate,
			costs: this.costs,
			changes: this.changes,
			refund: this.refund
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
