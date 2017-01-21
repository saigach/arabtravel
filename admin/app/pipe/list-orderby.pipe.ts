import { Pipe, PipeTransform } from '@angular/core'

import { MLString } from '../../../model/common'

@Pipe({
	name: 'listOrderBy',
	pure: false
})
export class ListOrderBy implements PipeTransform {
	transform(array: {}[], fields: string[]): {}[] {
		return array.sort( (a:{}, b:{}): number => {
			let i = 0
			let result = 0

			while (result === 0 && i < fields.length) {
				let field = fields[i]
				if (field[0] === '!') {
					field = field.substr(1)
					let aField = a[field] instanceof MLString ? a[field][MLString.Languages[0]] : a[field]
					let bField = b[field] instanceof MLString ? b[field][MLString.Languages[0]] : b[field]
					result = aField > bField ? -1 : aField < bField ? 1 : 0
				} else {
					let aField = a[field] instanceof MLString ? a[field][MLString.Languages[0]] : a[field]
					let bField = b[field] instanceof MLString ? b[field][MLString.Languages[0]] : b[field]
					result = aField > bField ? 1 : aField < bField ? -1 : 0
				}
				i++
			}
			return result
		})
	}
}
