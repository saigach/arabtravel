import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Order, Shift, PaymentType } from '../../../model/order'
import { Trip, Price, VehicleCost } from '../../../model/trip'
import { Vehicle } from '../../../model/vehicle'
import { Human, AgeGroup } from '../../../model/human'
import { Hotel } from '../../../model/hotel'

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

	submitted: boolean = false

	constructor(private router: Router, private apiService: APIService) {
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
			window.location.href = '/'
		else
			this.item =  new Order(currentOrderObj)
	}

	ngOnInit(): void {
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
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.order(this.item).then( value => {
			UIkit.notify('Order sucess', {status  : 'success' })
		}).catch( error => {
			UIkit.notify('Server error', {status  : 'warning' })
		})
	}
}
