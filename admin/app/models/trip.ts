import { UUID } from '../common/uuid'

export class Trip {
	__id: UUID

	name: string
	description: string

	constructor(value: any = {}) {
		this.__id = value.__id instanceof UUID ? value.__id : new UUID(value || null)

		this.name = value.name || ''
		this.description = value.description || ''
	}
}
