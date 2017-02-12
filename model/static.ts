
import { Model, File, MLString } from './common'

export class Static extends Model {
	static __api: string = 'objects/static'

	title: MLString
	description: MLString

	url: string
	content: MLString

	image: File

	constructor(value: any = {}) {
		super(value)

		this.title = new MLString(value.title)
		this.description = new MLString(value.description)

		this.url = String(value.url || '')
		this.content = new MLString(value.content)

		this.image = value.image ? ( value.image instanceof File ? value.image : new File(value.image) ) : null
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			title: this.title,
			description: this.description,
			url: this.url,
			content: this.content,
			image: this.image && this.image.toObject() || null
		})
	}
}
