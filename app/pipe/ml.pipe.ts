import { Pipe, PipeTransform } from '@angular/core'

import { MLString } from '../../model/common'

const globalLang = document.querySelector('html').getAttribute('lang')

@Pipe({
	name: 'ml'
})
export class MLPipe implements PipeTransform {
	transform(value: MLString | string, lang: string = null): string {
		if (!value)
			return ''

		if (typeof value === 'string')
			return value

		if (!lang)
			lang = globalLang

		if (MLString.Languages.includes(lang))
			return value[lang]

		return value[MLString.Languages[0]]
	}
}
