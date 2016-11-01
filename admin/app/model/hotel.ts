
import { Model } from './model'

export class Hotel extends Model {
	static __api: string = 'objects/hotel'

	description: string = ''

	constructor(value: any = {}) {
		super(value)


		// console.dir(value)

		// if (value.owner && value.owner.id){
		// 	console.log('Add owner')
		// 	this.owner = new User(value.owner)
		// }
		// else {
		// 	console.log('Not owner')
		// 	this.owner = null
		// }



		this.description = String(value.description || '')
	}

	toObject(): {} {
		return Object.assign(super.toObject(), {
			description: this.description || ''
		})
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}
