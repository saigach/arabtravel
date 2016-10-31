import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'listFilter',
	pure: false
})
export class ListFilterPipe implements PipeTransform {
	transform(array: any[], filter:string, fields: string[]): any[] {
		if (!filter.trim())
			return array

		let filterStr = filter.toLowerCase()

		return array.filter(item =>
			fields.reduce( (prev: boolean, value:string) => {
				if (item[value] === undefined)
					throw new TypeError(`Field ${value} is not found`)
				return prev || String(item[value]).toLowerCase().indexOf(filterStr) >= 0
			}, false)
		)
	}
}
