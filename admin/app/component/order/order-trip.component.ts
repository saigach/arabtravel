import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../../model/common'
import { TripOrder } from '../../../../model/trip-order'
import { Trip } from '../../../../model/trip'
import { Price } from '../../../../model/price'
import { Vehicle } from '../../../../model/vehicle'
import { Human } from '../../../../model/human'

@Component({
	moduleId: module.id,
	selector: 'order-trip',
	templateUrl: '/app/component/order/order-trip.component.html'
})
export class OrderTripComponent implements OnInit {

	trips: Trip[] = []
	vehicles: Vehicle[] = []

	item: TripOrder = new TripOrder()

	@Output() orderChange = new EventEmitter()

	@Input()
	get order() {
		return this.item
	}

	set order(value: TripOrder) {
		this.item = value
		this.orderChange.emit(this.item)
	}

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null

	@ViewChild('returnDateNode') returnDateRef: ElementRef
	returnDateDatepicker: any = null

	constructor(private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) =>
			this.trips = response.filter( (value:Trip) => value.enable && value.pointA && value.pointB )
		)

		this.apiService.get<Vehicle>(Vehicle).then( (response: Vehicle[]) =>
			this.vehicles = response.filter( (value:Vehicle) => value.enable )
		)

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event => {
			this.item.departureDate = str2Date(event.target.value)
			this.reloadPrice()
		})

		this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.returnDateDatepicker.on('hide.uk.datepicker', event => {
			this.item.returnDate = str2Date(event.target.value)
			this.reloadPrice()
		})
	}

	reloadPrice(): void {
		this.item.price = this.item.trip && this.item.trip.getPrice(this.item.date) || new Price()
	}

	addHuman(): void {
		this.item.people.push(new Human())
	}

	deleteHuman(human: Human): void {
		this.item.people = this.item.people.filter(value => value !== human)
	}

	changeTrip(): void {
		if (this.item.trip)
			this.apiService.get<Trip>(Trip, this.item.trip).then( (response: Trip) => {
				this.item.trip = response
				this.reloadPrice()
			})
		else
			this.reloadPrice()
	}
}

