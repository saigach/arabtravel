import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../../model/common'
import { Price, Cost, Refund } from '../../../../model/price'
import { Vehicle } from '../../../../model/vehicle'

@Component({
	moduleId: module.id,
	selector: 'price',
	templateUrl: '/app/component/price/price.component.html'
})
export class PriceComponent implements OnInit {

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

	_hideVehicle: boolean = false

	@Output() hideVehicleChange = new EventEmitter()

	@Input()
	get hideVehicle() {
		return this._hideVehicle
	}

	set hideVehicle(value: boolean) {
		this._hideVehicle = value
		this.hideVehicleChange.emit(this._hideVehicle)
	}

	@ViewChild('startDate') startDateRef: ElementRef
	startDateDatepicker: any = null

	@ViewChild('endDate') endDateRef: ElementRef
	endDateDatepicker: any = null

	vehicleList: Vehicle[] = []

	constructor(private apiService: APIService) {}

	ngOnInit(): void {

		this.apiService.get<Vehicle>(Vehicle).then( (response: Vehicle[]) => this.vehicleList = response)

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

	get ageCosts(): Cost[] {
		return this.item.costs.filter(value => ! (value.key instanceof Vehicle)).sort((a, b) => a.cost - b.cost)
	}

	get vehicleCosts(): Cost[] {
		return this.item.costs.filter(value => value.key instanceof Vehicle)
	}

	addAgeCost(): void {
		this.item.costs.push(new Cost())
	}

	addVehicleCost(): void {
		this.item.costs.push(new Cost({ key: this.vehicleList[0] }))
	}

	deleteCost(cost: Cost): void {
		this.item.costs = this.item.costs.filter(value => value !== cost)
	}

	addRefund(): void {
		this.item.refunds.push(new Refund())
	}

	deleteRefund(refund: Refund): void {
		this.item.refunds = this.item.refunds.filter(value => value !== refund)
	}
}

