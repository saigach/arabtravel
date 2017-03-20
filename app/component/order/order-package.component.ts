import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { MLString } from '../../../model/common'
import { PackageOrder } from '../../../model/package-order'
import { Human } from '../../../model/human'
import { Room } from '../../../model/hotel'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

@Component({
	moduleId: module.id,
	selector: 'order-package',
	templateUrl: '/app/component/order/order-package.component.html'
})
export class OrderPackageComponent implements OnInit {

	item: PackageOrder = new PackageOrder()

	submitting: boolean = false
	submitted: boolean = false

	ml: { [key:string]: MLString } = {}

	lang = lang

	_currency: string = 'usd'

	get currency():string {
		return (this.ml && this._currency in this.ml) ? this.ml[this._currency][lang] : this._currency
	}

	set currency(value: string) {
		this._currency = value ? value : 'usd'
	}

	get exchangeRate(): number {
		if (this._currency === 'jod')
			return 1

		return this.item && this.item.exchangeRate || 0
	}

	// peopleCount: PeopleCount[] = AgeGroup.List.reduce(
	// 	( prev:PeopleCount[], value:AgeGroup ) =>
	// 		prev.concat({
	// 			ageGroup: value,
	// 			count: value.id === 'adults' ? 1 : 0
	// 		}),
	// 	[]
	// )


	constructor(private router: Router, private apiService: APIService, private mlService: MLService, private ref: ChangeDetectorRef) {

		this.currency = localStorage && localStorage.getItem('currency') || null

		let currentOrderObj: {} = null

		try {
			currentOrderObj = JSON.parse(localStorage.getItem('currentOrder'))
		} catch(error) {
			currentOrderObj = null
		}

		if (!currentOrderObj)
			window.location.href = '/' + lang
		else {
			this.item = new PackageOrder(currentOrderObj)
			this.item.price = this.item.package.getPrice(this.item.anyDate ? undefined : this.item.departureDate)
		}
	}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)

		this.apiService.config().then((response: {
			processingFee: number,
			exchangeRate: number,
			egyptianMarkUp: number
		}) => {
			this.item.processingFee = response.processingFee
			this.item.exchangeRate = response.exchangeRate
			this.item.egyptianMarkUp = response.egyptianMarkUp
		})

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-set]'),
			currencySetNode => currencySetNode.addEventListener('click', event =>{
				event.preventDefault()
				this.currency = currencySetNode.getAttribute('currency-set') || null
			})
		)
	}

	regenPeople() {
		// this.item.people = this.peopleCount.reduce(
		// 	(prev: Human[], value:PeopleCount) => {
		// 		for(let i = 0; i < value.count; i++)
		// 			prev.push(new Human({ defaultAgeGroup: value.ageGroup }))
		// 		return prev
		// 	},
		// 	[]
		// )
	}

	primaryContact = new Human()

	submit(): void {
		if (this.submitting)
			return
		this.submitting = true

		this.apiService.order(this.item, this.primaryContact).then( value => {
			this.item = new PackageOrder(value)
			UIkit.notify('Order sucess', {status  : 'success' })
			this.submitted = true
			localStorage.removeItem('currentOrder')
			this.submitting = false
		}).catch( error => {
			if (error.code && error.code === 401) {

				let loginForm: any = document.querySelector('#login-form-modal form')
				loginForm.elements.email.value = this.primaryContact && this.primaryContact.email

				UIkit.modal('#login-form-modal').show()
				this.submitting = false
				return
			}

			UIkit.notify('Server error', {status  : 'warning' })
			this.submitting = false
		})
	}
}
