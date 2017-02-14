import { newDate, Model, MLString } from './common'
import { User } from './user'

import { Human, AgeGroup } from './human'
import { Price } from './price'

export class PaymentType {
	static List:PaymentType[] = [
		new PaymentType({
			id: 'card',
			title: new MLString({
				en: 'Card',
				ar: 'بطاقة ائتمان'
			}),
			icon: null }),
		new PaymentType({
			id: 'bank',
			title: new MLString({
				en: 'Bank transfer',
				ar: 'التحويل المصرفي'
			}),
			icon: null
		}),
		new PaymentType({
			id: 'wu',
			title: new MLString({
				en: 'Western Union',
				ar: 'الاتحاد الغربي'
			}),
			icon: null
		})
	]

	static getPaymentType(id: string = ''): PaymentType {
		return PaymentType.List.find( (value:PaymentType) => value.id === id) || PaymentType.List[0]
	}

	id: string
	title: MLString
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
		this.icon = String(value.icon || '')
	}
}

export class OrderStatus {
	static List:OrderStatus[] = [
		new OrderStatus({
			id: 'new',
			title: new MLString({
				en: 'New order',
				ar: 'طلب جديد'
			}),
			icon: null
		}),
		new OrderStatus({
			id: 'processing',
			title: new MLString({
				en: 'Under processing',
				ar: 'تحت التجهيز'
			}),
			icon: null
		}),
		new OrderStatus({
			id: 'need-payment-confirm',
			title: new MLString({
				en: 'Need payment confirm',
				ar: 'تحتاج تأكيد الدفع'
			}),
			icon: null
		}),
		new OrderStatus({
			id: 'confirmed',
			title: new MLString({
				en: 'Confirmed',
				ar: 'مؤكد'
			}),
			icon: null
		}),
		new OrderStatus({
			id: 'not-approved',
			title: new MLString({
				en: 'Not approved',
				ar: 'غير مقبول'
			}),
			icon: null
		}),
		new OrderStatus({
			id: 'cancellation',
			title: new MLString({
				en: 'Cancellation',
				ar: 'إلغاء'
			}),
			icon: null
		}),
		new OrderStatus({
			id: 'canceled',
			title: new MLString({
				en: 'Canceled',
				ar: 'ألغيت'
			}),
			icon: null
		})
	]

	static getOrderStatus(id: string = ''): OrderStatus {
		return OrderStatus.List.find( (value:OrderStatus) => value.id === id) || OrderStatus.List[0]
	}

	id: string
	title: MLString
	icon: string
	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
		this.icon = String(value.icon || '')
	}
}

const cardRx = {
	electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
	maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
	dankort: /^(5019)\d+$/,
	interpayment: /^(636)\d+$/,
	unionpay: /^(62|88)\d+$/,
	visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
	mastercard: /^5[1-5][0-9]{14}$/,
	amex: /^3[47][0-9]{13}$/,
	diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
	discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
	jcb: /^(?:2131|1800|35\d{3})\d{11}$/
}

export class Card {
	number: string
	cardholder: string
	validMonth: number
	validYear: number
	cvv: string

	constructor(value: any = {}) {
		this.number =  String(value.number || '')
		this.cardholder = String(value.cardholder || '')

		let month = Number.parseInt(value.validMonth || 0)

		this.validMonth =  month > 0 && month <= 12 && month || 1

		let year = Number.parseInt(value.validYear || 0)
		this.validYear = year > 2000 && year || new Date().getFullYear()

		this.cvv = String(value.cvv || '')
	}

	toObject(): {} {
		return {
			number: this.number,
			cardholder: this.cardholder,
			validMonth: this.validMonth,
			validYear: this.validYear,
			cvv: this.cvv
		}
	}

	get type() {
		let number = this.number.replace(/[^0-9]+/, '')
		if (!number)
			return null
		for(let key in cardRx)
			if(cardRx[key].test(number))
				return key
		return null
	}
}

export type PeopleCount = { ageGroup: AgeGroup, count: number }

export class OrderType {
	static List:OrderType[] = [
		new OrderType({
			id: 'trip',
			title: new MLString({
				en: 'Trip',
				ar: 'رحلة قصيرة'
			}),
			icon: 'uk-icon-anchor'
		}),
		new OrderType({
			id: 'package',
			title: new MLString({
				en: 'Package',
				ar: 'صفقة'
			}),
			icon: 'uk-icon-suitcase'
		})
	]

	static getOrderType(id: string = ''): OrderType {
		return OrderType.List.find( (value:OrderType) => value.id === id) || OrderType.List[0]
	}

	id: string
	title: MLString
	icon: string

	constructor(value: any = {}) {
		this.id = String(value.id || '')
		this.title = new MLString(value.title)
		this.icon = String(value.icon || '')
	}
}

export class Order extends Model {
	static __api: string = 'objects/order'

	type: OrderType

	hrid: number
	description: string

	owner: User = null

	date: Date

	departureDate: Date
	returnDate: Date

	price: Price

	people: Human[]

	paymentType: PaymentType
	card: Card

	status: OrderStatus

	processingFee: number
	exchangeRate: number
	egyptianMarkUp: number

	constructor(value: any = {}) {
		super(value)

		this.type = OrderType.getOrderType(value.type || null)

		this.hrid = Number.parseInt(value.hrid || 0) || 0

		this.description = String(value.description || '')

		if (value.owner && value.owner.id)
			this.owner = new User(value.owner)

		this.date = value.date ? new Date(value.date) : new Date()

		if (Number.isNaN( this.date.getTime() ))
			this.date = new Date()

		this.departureDate = newDate(value.departureDate) || newDate()
		this.returnDate = newDate(value.returnDate) || newDate()

		this.price = value.price ? ( value.price instanceof Price ? value.price : new Price(value.price) ) : null

		this.people = value.people instanceof Array ?
			value.people.reduce(
				( prev: Human[] , value:any ) =>
					value ? prev.concat(value instanceof Human ? value : new Human(value)) : prev,
				[]
			) : []

		this.paymentType = PaymentType.getPaymentType(value.paymentType || null)

		this.card = new Card(value.card || {})

		this.status = OrderStatus.getOrderStatus(value.status || null)

		this.processingFee = Math.max( 0, Number.parseFloat(value.processingFee || 0) || 0 )
		this.exchangeRate = Math.max( 0, Number.parseFloat(value.exchangeRate || 0) || 0 )
		this.egyptianMarkUp = Math.max( 0, Number.parseFloat(value.egyptianMarkUp || 0) || 0 )
	}

	toObject(): {} {
		return Object.assign({}, super.toObject(), {
			type: this.type.id,
			hrid: this.hrid,
			description: this.description,
			owner: this.owner && this.owner.id.uuid || null,
			date: this.date,
			departureDate: this.departureDate,
			returnDate: this.returnDate,
			price: this.price && this.price.toObject() || null,
			people: this.people.reduce( (prev: {}[], value: Human) => prev.concat(value.toObject()), []),
			paymentType: this.paymentType.id,
			card: this.card.toObject(),
			status: this.status.id,
			processingFee: this.processingFee,
			exchangeRate: this.exchangeRate,
			egyptianMarkUp: this.egyptianMarkUp
		})
	}

	get peopleCount(): PeopleCount[] {
		return AgeGroup.List.reduce( (prev: PeopleCount[] , ageGroup: AgeGroup) =>
			prev.concat({
				ageGroup: ageGroup,
				count: this.people.reduce( (prev: number, human: Human) =>
					human.getAgeGroup(this.date) === ageGroup ? ++prev : prev,
					0
				)
			}),
			[]
		).filter( (value:PeopleCount) => value.count > 0 )

	}
}
