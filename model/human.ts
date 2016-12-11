
import { Model } from './model'
import { User } from './user'

export const Nationality: { id: string, title: string, icon: string }[] = [
	{ id: 'egyptian', title: 'Egyptian', icon: '' },
	{ id: 'russian', title: 'Russian', icon: '' },
	{ id: 'jordanian', title: 'Jordanian', icon: '' }
]

const newDate = value => {
	if (value instanceof Date)
		return value

	let date = new Date(value)

	if ( !Number.isNaN( date.getTime() ) )
		return date

	return null
}

type AgeGroup = 'adults' | 'kids' | 'infants'

export class Human extends Model {
	static __api: string = 'objects/human'

	nationality: { id: string, title: string, icon: string } = Nationality[1]
	dob: Date = null
	passport: string = ''

	phone: string = ''
	email: string = ''

	description: string = ''

	getAge(now: Date = new Date()): number {
		if (!this.dob)
			return null

		let ageDifMs: number = Number(now) - this.dob.getTime()
		return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970)
	}

	getAgeGroup(now: Date = new Date()): AgeGroup {
		let age = this.getAge(now)

		if (age === null)
			return null

		if (age > 6)
			return 'adults'

		if (age >= 2 && age <= 6)
			return 'kids'

		if (age < 2)
			return 'infants'
	}

	constructor(value: any = {}) {
		super(value)

		this.nationality = value.nationality && Nationality.find(
			nationality => nationality.id === value.nationality
		) || Nationality[0]

		this.dob = value.dob && newDate(value.dob) || null
		if (this.dob)
			this.dob.setHours(0,0,0,0)

		this.passport = String(value.passport || '')

		this.phone = String(value.phone || '')
		this.email = String(value.email || '')

		this.description = String(value.description || '')
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			nationality: this.nationality.id,

			dob: this.dob,
			passport: this.passport,

			phone: this.phone,
			email: this.email,

			description: this.description || ''
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
