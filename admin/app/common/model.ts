import { UUID } from '../common/uuid'

export class Model {
	public static __api: string = ''

	__id: UUID
	__enable: boolean

	constructor(value: any = {}) {
		this.__id = value.__id instanceof UUID && value.__id || new UUID(value.__id || null)
		this.__enable = value.__enable === undefined ? true : !!value.__enable
	}

	parse({} = {}): void { }

	toJSON(): {} {
		return {
			__id: this.__id.toString(),
			__enable: this.__enable,
		}
	}

	toString(): string {
		return JSON.stringify(this.toJSON())
	}
}
