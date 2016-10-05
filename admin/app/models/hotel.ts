import { UUID } from '../common/uuid'

export class Hotel {
	__id: UUID
	__enable: boolean

	title: string
	description: string

	rootms: string

	constructor(value: any = {}) {
		this.__id = value.__id instanceof UUID ? value.__id : new UUID(value || null)
		this.__enable = value.__enable || false
		this.title = value.name || ''
		this.description = value.description || ''
	}
}
