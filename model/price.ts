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

	adults: number = 0 // > 6
	kids: number = 0 // 2-6
	infants: number = 0 // < 2

	egyptianMarkUp: number = 0 // margin percentage

	refund: { interval: number, percent: number }[]

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

		this.adults = Math.max(0, Number.parseFloat(value.adults || 0))
		this.kids = Math.max(0, Number.parseFloat(value.kids || 0))
		this.infants = Math.max(0, Number.parseFloat(value.infants || 0))

		this.egyptianMarkUp = Math.max( 0, Math.min( Number.parseFloat(value.egyptianMarkUp || 0), 1 ) )

		this.refund = value.refund instanceof Array && value.refund.reduce(
			( prev: { interval: number, percent: number }[] , value:any ) =>
				prev.concat({
					interval: Number.parseInt(value.interval || 0),
					percent: Math.max( 0, Math.min( Number.parseFloat(value.percent || 0), 1 ) )
				}),
			[]
		) || []
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			startDate: this.startDate,
			endDate: this.endDate,
			adults: this.adults,
			kids: this.kids,
			infants: this.infants,
			egyptianMarkUp: this.egyptianMarkUp,
			refund: this.refund
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
