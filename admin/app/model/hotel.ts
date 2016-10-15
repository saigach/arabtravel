import { Model } from '../common/model'

export class Hotel extends Model {
	public static __api: string = 'hotel'

	name: string
	description: string

	constructor(value: any = {}) {
		super(value)
		this.parse(value)
	}

	parse({ name = '', description = '', email = null } = {}): Error | void {
		this.name = String(name)
		this.description = String(description)
	}

	toJSON(): {} {
		return Object.assign(super.toJSON(), {
			name: this.name,
			description: this.description
		})
	}
}
