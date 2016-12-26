import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Order, Shift, OrderStatus, PaymentType } from '../../../../model/order'
import { Human } from '../../../../model/human'
import { Hotel } from '../../../../model/hotel'
import { Trip } from '../../../../model/trip'

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
	trips: Trip[] = []

	item: Order = new Order()

	submitted: boolean = false

	get valid(): boolean {
		return this.item.title.length > 0
	}

	// getAdultsCount(date: Date = new Date()): number {
	// 	return this.item.people.reduce( (prev: number, human: Human) =>
	// 		human.getAgeGroup(date) === 'adults' ? ++prev : prev,
	// 		0
	// 	)
	// }

	// getKidsCount(date: Date = new Date()): number {
	// 	return this.item.people.reduce( (prev: number, human: Human) =>
	// 		human.getAgeGroup(date) === 'kids' ? ++prev : prev,
	// 		0
	// 	)
	// }

	// getInfantsCount(date: Date = new Date()): number {
	// 	return this.item.people.reduce( (prev: number, human: Human) =>
	// 		human.getAgeGroup(date) === 'infants' ? ++prev : prev,
	// 		0
	// 	)
	// }

	// get ticketsCost(): number {
	// 	return this.item.shifts.reduce(
	// 		(prev: number, shift: Shift ) => {
	// 			prev += this.getAdultsCount(shift.date) * shift.price.adults
	// 			prev += this.getKidsCount(shift.date) * shift.price.kids
	// 			prev += this.getInfantsCount(shift.date) * shift.price.infants
	// 			return prev
	// 		},
	// 		0
	// 	)
	// }

	// get totalCost(): number {
	// 	return this.ticketsCost
	// }

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

		Promise.all([
			this.apiService.get<Trip>(Trip).then( (response: Trip[]) => this.trips = response ),
			this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) => this.hotels = response )
		]).then( () => {
			if (id.toLowerCase() !== 'new')
				this.apiService.get<Order>(Order, id)
					.then((response: Order) => this.item = response)
					.catch(error => this.item = null)
		})
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
		this.apiService.get<Hotel>(Hotel, this.item.hotel)
			.then((response: Hotel) => this.item.hotel = response)
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

