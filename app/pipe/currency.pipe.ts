import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
	transform(value: number | string, exchangeRate: number = 1): number {
		let val: number = 0

		if (typeof value === 'string')
			val = parseFloat(value)
		else
			val = Number(value)

		if (0 === val)
			return 0

		return val * exchangeRate
	}
}
