import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../../model/common'
import { Price, VehicleCost, Refund } from '../../../../model/trip'
import { Vehicle } from '../../../../model/vehicle'

@Component({
	moduleId: module.id,
	selector: 'trip-price',
	templateUrl: '/app/component/trip/trip-price.component.html'
})
export class TripPriceComponent implements OnInit {

	item: Price = new Price()

	@Output() priceChange = new EventEmitter()

	@Input()
	get price() {
		return this.item
	}

	set price(value: Price) {
		this.item = value
		this.priceChange.emit(this.item)
	}

	@ViewChild('startDate') startDateRef: ElementRef
	startDateDatepicker: any = null

	@ViewChild('endDate') endDateRef: ElementRef
	endDateDatepicker: any = null

	vehicle: Vehicle[] = []

	constructor(private apiService: APIService) {}

	ngOnInit(): void {

		this.apiService.get<Vehicle>(Vehicle).then( (response: Vehicle[]) => {
			this.vehicle = response
			this.vehicle.forEach( (vehicle:Vehicle) => {
				let vehicleCost: VehicleCost = this.item.vehicles.find( (vehicleCost:VehicleCost) => vehicleCost.vehicle.id.uuid === vehicle.id.uuid )

				if (!vehicleCost)
					return this.item.vehicles.push(new VehicleCost({ vehicle: vehicle }))

				vehicleCost.vehicle = vehicle
			} )
		})

		this.startDateDatepicker = UIkit.datepicker(this.startDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.startDateDatepicker.on('hide.uk.datepicker', event =>
			this.item.startDate = str2Date(event.target.value)
		)

		this.endDateDatepicker = UIkit.datepicker(this.endDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.endDateDatepicker.on('hide.uk.datepicker', event =>
			this.item.endDate = str2Date(event.target.value)
		)
	}

	addRefund(): void {
		this.item.refunds.push(new Refund())
	}

	deleteRefund(refund: Refund): void {
		this.item.refunds = this.item.refunds.filter(value => value !== refund)
	}
}

