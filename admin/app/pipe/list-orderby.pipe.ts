import { Pipe, PipeTransform } from '@angular/core'

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
					result = a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0
				} else
					result = a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
				i++
			}
			return result
		})
	}
}
