import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { MLString } from '../../../../model/common'
import { Order, Shift, OrderStatus, PaymentType } from '../../../../model/order'
import { Human } from '../../../../model/human'
import { Hotel } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'order-item',
	templateUrl: '/app/component/order/order-item.component.html'
})
export class OrderItemComponent implements OnInit {

	months: number[] = [1,2,3,4,5,6,7,8,9,10]
	years: number[] = []
	statusList = OrderStatus.List
	paymentTypeList = PaymentType.List

	hotels: Hotel[] = []

	item: Order = new Order()

	submitted: boolean = false

	get valid(): boolean {
		return true
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {
		let thisYear = (new Date()).getFullYear()
		for (let i = thisYear; i <= thisYear + 10; i++)
			this.years.push(i)
	}

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'] || null
		if (!id)
			return

		if (id.toLowerCase() !== 'new')
			this.apiService.get<Order>(Order, id)
				.then((response: Order) => this.item = response)
				.catch(error => this.item = null)
		else
			this.apiService.config().then((response: {
				processingFee: number,
				exchangeRate: number,
				egyptianMarkUp: number
			}) => {
				this.item.processingFee = response.processingFee
				this.item.exchangeRate = response.exchangeRate
				this.item.egyptianMarkUp = response.egyptianMarkUp
			})

		this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) => this.hotels = response )
	}

	back(): void {
		this.location.back()
	}

	addHuman(): void {
		this.item.people.push(new Human())
	}

	deleteHuman(human: Human): void {
		this.item.people = this.item.people.filter(value => value !== human)
	}

	hotelChange():void {
		if (this.item.hotel)
			this.apiService.get<Hotel>(Hotel, this.item.hotel)
				.then((response: Hotel) => {
					this.item.hotel = response
					this.item.room = null
				})
				.catch(error => this.item.hotel = null)
	}

	addShift(): void {
		this.item.shifts.push(new Shift())
	}

	deleteShift(shift: Shift): void {
		this.item.shifts = this.item.shifts.filter(value => value !== shift)
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Order>(Order, this.item).then((response: Order) => this.back())
	}
}

