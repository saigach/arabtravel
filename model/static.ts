
import { Model, File } from './common'

export class Static extends Model {
	static __api: string = 'static'
	static __primaryFields = Model.__primaryFields.concat(['url'])

	url: string
	content: string

	image: File

	constructor(value: any = {}) {
		super(value)

		this.url = String(value.url || '')
		this.content = String(value.content || '')

		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			url: this.url,
			content: this.content,
			image: this.image && this.image.toObject() || null
		})
	}
}
