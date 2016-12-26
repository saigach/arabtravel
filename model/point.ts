
import { Model } from './common'

export class Point extends Model {
	static __api: string = 'objects/point'

	constructor(value: any = {}) {
		super(value)
	}
}
