import { UUID } from './uuid'

export class Model {
	static __api: string = ''

	id: UUID = new UUID()
	enable: boolean = true

	title: string = ''

	constructor(value: any = {}) {
		this.id = value.id instanceof UUID && value.id || new UUID(value.id || null)
		this.enable = value.enable === undefined ? true : !!value.enable
		this.title = String(value.title || '')
	}

	toObject(): {} {
		return {
			id: this.id.toString(),
			enable: this.enable,
			title: this.title
		}
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}



