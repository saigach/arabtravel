import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../../model/common'
import { Shift } from '../../../../model/order'
import { Trip } from '../../../../model/trip'
import { Vehicle } from '../../../../model/vehicle'

@Component({
	moduleId: module.id,
	selector: 'order-shift',
	templateUrl: '/app/component/order/order-shift.component.html'
})
export class OrderShiftComponent implements OnInit {

	trips: Trip[] = []
	vehicles: Vehicle[] = []

	item: Shift = new Shift()

	@Output() shiftChange = new EventEmitter()

	@Input()
	get shift() {
		return this.item
	}

	set shift(value: Shift) {
		this.item = value
		this.shiftChange.emit(this.item)
	}

	@ViewChild('dateNode') dateRef: ElementRef
	dateDatepicker: any = null

	constructor(private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) =>
			this.trips = response.filter( (value:Trip) => value.enable && value.pointA && value.pointB )
		)

		this.apiService.get<Vehicle>(Vehicle).then( (response: Vehicle[]) =>
			this.vehicles = response.filter( (value:Vehicle) => value.enable )
		)

		this.dateDatepicker = UIkit.datepicker(this.dateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.dateDatepicker.on('hide.uk.datepicker', event => {
			this.item.date = str2Date(event.target.value)
			this.reloadPrice()
		})
	}

	reloadPrice(): void {
		this.item.price = this.item.trip && this.item.trip.getPrice(this.item.date) || null
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

