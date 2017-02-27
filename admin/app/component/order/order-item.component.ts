import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { MLString } from '../../../../model/common'
import { Order, OrderStatus, PaymentType, OrderType } from '../../../../model/order'
import { TripOrder } from '../../../../model/trip-order'
import { PackageOrder } from '../../../../model/package-order'

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

	types: OrderType[] = OrderType.List

	item: TripOrder | PackageOrder | Order = new Order()

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
		let type: string = this.route.snapshot.params['type'] || null
		let id: string = this.route.snapshot.params['id'] || null

		if (!type || !id)
			return

		if (id.toLowerCase() !== 'new') {
			switch (type) {
				case 'trip':
					this.apiService.get<TripOrder>(TripOrder, id)
						.then((response: TripOrder) => this.item = response)
						.catch(error => this.item = null)
					break

				case 'package':
					this.apiService.get<PackageOrder>(PackageOrder, id)
						.then((response: PackageOrder) => this.item = response)
						.catch(error => this.item = null)
					break
			}
		}
		else {
			switch (type) {
				case 'trip':
					this.item = new TripOrder()
					break

				case 'package':
					this.item = new PackageOrder()
					break
			}

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
	}

	back(): void {
		this.location.back()
	}

	setType(type: OrderType): void {
		this.item.type = type

		switch (this.item.type) {
			case OrderType.getOrderType('trip'):
				this.item = new TripOrder(this.item.toObject())
				break

			case OrderType.getOrderType('package'):
				this.item = new PackageOrder(this.item.toObject())
				break
		}
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		switch (this.item.type) {
			case OrderType.getOrderType('trip'):
				this.apiService.update<TripOrder>(TripOrder, this.item).then((response: TripOrder) => this.back())
				break

			case OrderType.getOrderType('package'):
				this.apiService.update<PackageOrder>(PackageOrder, this.item).then((response: PackageOrder) => this.back())
				break
		}
	}
}

