import { Pipe, PipeTransform } from '@angular/core'

import { MLString } from '../../../model/common'

@Pipe({
	name: 'ml'
})
export class MLPipe implements PipeTransform {
	transform(value: MLString | string, lang: string = null): string {
		if (typeof value === 'string')
			return value

		if (!lang)
			return Object.keys(value).reduce( (prev:string, key:string, ind: number) => {
				prev += ind > 0 ? '; ' : ''
				prev += value[key]
				return prev
			}, '')

		if (MLString.Languages.includes(lang))
			return value[lang]

		return value[MLString.Languages[0]]
	}
}
