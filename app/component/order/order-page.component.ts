import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { MLString } from '../../../model/common'
import { Order, PaymentType } from '../../../model/order'
import { Trip } from '../../../model/trip'
import { Price, VehicleCost } from '../../../model/price'
import { Vehicle } from '../../../model/vehicle'
import { Human, AgeGroup } from '../../../model/human'
import { Hotel } from '../../../model/hotel'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

type TripType = 'oneway' | 'round' | 'package'

@Component({
	moduleId: module.id,
	selector: 'order-page',
	templateUrl: '/app/component/order/order-page.component.html'
})
export class OrderPageComponent implements OnInit {

	months: number[] = [1,2,3,4,5,6,7,8,9,10]
	years: number[] = []

	paymentTypes: PaymentType[] = PaymentType.List
	ageGroups: AgeGroup[] = AgeGroup.List

	item: Order = new Order()
	primaryContact: Human =  null

	submitting: boolean = false
	submitted: boolean = false

	ml: { [key:string]: MLString } = {}

	_currency: string = 'usd'

	get currency():string {
		return this._currency === 'usd' ? '$' : this._currency
	}

	set currency(value: string) {
		this._currency = value ? value : 'usd'
		// this.ref.detectChanges()
	}

	get exchangeRate(): number {
		if (this._currency === 'jod')
			return 1

		return this.item && this.item.exchangeRate || 0
	}

	constructor(private router: Router, private apiService: APIService, private mlService: MLService, private ref: ChangeDetectorRef) {

		this.currency = localStorage && localStorage.getItem('currency') || null

		let thisYear = (new Date()).getFullYear()
		for (let i = thisYear; i <= thisYear + 10; i++)
			this.years.push(i)

		let currentOrderObj: {} = null

		try {
			currentOrderObj = JSON.parse(localStorage.getItem('currentOrder'))
		} catch(error) {
			currentOrderObj = null
		}

		if (!currentOrderObj)
			window.location.href = '/' + lang
		else
			this.item =  new Order(currentOrderObj)
	}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)

		this.primaryContact = this.item.people.length > 0 ? this.item.people[0] : null

		this.apiService.config().then((response: {
			processingFee: number,
			exchangeRate: number,
			egyptianMarkUp: number
		}) => {
			this.item.processingFee = response.processingFee
			this.item.exchangeRate = response.exchangeRate
			this.item.egyptianMarkUp = response.egyptianMarkUp
		})

		UIkit.sticky('#order-details', {boundary: '#sticky-boundary'});

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-set]'),
			currencySetNode => currencySetNode.addEventListener('click', event =>{
				event.preventDefault()
				this.currency = currencySetNode.getAttribute('currency-set') || null
			})
		)
	}

	addHuman(): void {
		this.item.people.push(new Human())
		if (this.item.people.length === 1)
			this.primaryContact = this.item.people[0]
	}

	deleteHuman(human: Human): void {
		this.item.people = this.item.people.filter(value => value !== human)
		if (!this.item.people.includes(this.primaryContact))
			this.primaryContact = this.item.people.length > 0 ? this.item.people[0] : null
	}

	submit(): void {
		if (this.submitting)
			return
		this.submitting = true

		this.apiService.order(this.item, this.primaryContact).then( value => {
			this.item = new Order(value)
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
