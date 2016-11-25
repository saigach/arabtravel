
import { Model } from './model'
import { User } from './user'

export class Static extends Model {
	static __api: string = 'static'

	owner: User = null
	content: string = ''
	url: string = ''

	description: string = ''
	image: string = ''

	constructor(value: any = {}) {
		super(value)

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)
		else
			this.owner = null

		this.content = String(value.content || '')
		this.url = String(value.url || '')
		this.description = String(value.description || '')
		this.image = String(value.image || '')
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			content: this.content,
			url: this.url,
			description: this.description || '',
			image: this.image
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
