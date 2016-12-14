
import { Model } from './model'
import { User } from './user'

import { Human } from './human'
import { Shift } from './shift'

const newDate = value => {
	if (value instanceof Date)
		return value

	let date = new Date(value)

	if ( !Number.isNaN( date.getTime() ) )
		return date

	return null
}

type PaymentType = 'card' | 'bank' | 'wu'

export class Order extends Model {
	static __api: string = 'objects/order'

	owner: User = null
	date: Date = new Date()

	shifts: Shift[] = []

	people: Human[] = []

	description: string = ''

	paymentType: PaymentType = 'card'

	paymentCard: {
		number: string,
		cardholder: string,
		validMonth: number,
		validYear: number,
		cvv: string
	} = {
		number: '',
		cardholder: '',
		validMonth: 1,
		validYear: new Date().getFullYear(),
		cvv: ''
	}

	successful: boolean = false

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.date = value.dob && newDate(value.date) || new Date()

		this.shifts = value.shifts instanceof Array && value.shifts.reduce(
			( prev: Shift[] , value:any ) => {
				let shift = new Shift(value)
				if (!shift.date || !shift.trip || !shift.price)
					return prev
				return prev.concat(shift)
			}, []
		).filter(value => !!value) || []

		this.people = value.people instanceof Array && value.people.reduce(
			( prev: Human[] , value:any ) =>
				prev.concat(value instanceof Human && value || value && new Human(value) || null),
			[]
		).filter(value => !!value) || []

		this.description = String(value.description || '')

		this.paymentType = value.paymentType || 'card'

		this.paymentCard = value.paymentCard || { number: '', cardholder: '', validMonth: 1, validYear: 2016, cvv: '' }

		this.successful = !!value.successful
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			owner: this.owner && this.owner.id.toString() || null,
			shifts: this.shifts.reduce( (prev, value) => prev.concat(value.toObject()), []),
			date: this.date,
			people: this.people.reduce( (prev, value) => prev.concat(value.toObject()), []),
			description: this.description || '',
			paymentType: this.paymentType,
			paymentCard: this.paymentCard,
			successful: this.successful
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
