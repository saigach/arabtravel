import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../model/trip'
import { Order } from '../../../model/order'

@Component({
	moduleId: module.id,
	selector: 'order-page',
	templateUrl: '/app/component/order/order-page.component.html'
})
export class OrderPageComponent implements OnInit {

	order: Order = null

	submitted: boolean = false

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {

		let currentOrder: any = localStorage.getItem('currentOrder')
		if (!currentOrder) {
			window.location.href = '/'
			return
		}

		try {
			currentOrder = JSON.parse(currentOrder)
		} catch(error) {
			window.location.href = '/'
			return
		}

		if (!currentOrder.trip) {
			window.location.href = '/'
			return
		}

		this.apiService.get<Trip>(Trip,currentOrder.trip).then( (trip: Trip) =>
			this.order = new Order({
				trip: trip,
				date: new Date(currentOrder.date || undefined),
				people: Array( Number.parseInt(currentOrder.peopleCount) || 1 ).fill({})
			})
		)
	}
}

