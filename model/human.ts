
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

export class Human extends Model {
	static __api: string = 'objects/human'

	owner: User = null

	name: string = ''
	nationality: { id: string, title: string, icon: string } = Nationality[1]
	dob: Date = null
	passport: string = ''

	phone: string = ''
	email: string = ''

	description: string = ''

	get age(): number {
		if (!this.dob)
			return null

		let now = new Date()
		now.setHours(0,0,0,0)

		let ageDifMs: number = Number(now) - this.dob.getTime()
		return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970)
	}

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.name = String(value.name || '')

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
			owner: this.owner && this.owner.id.toString() || null,

			name: this.name,

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
