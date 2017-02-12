import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../../model/common'
import { PackageOrder } from '../../../../model/package-order'
import { Package } from '../../../../model/package'
import { Price } from '../../../../model/price'
import { Hotel } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'order-package',
	templateUrl: '/app/component/order/order-package.component.html'
})
export class OrderPackageComponent implements OnInit {

	packages: Package[] = []
	hotels: Hotel[] = []

	item: PackageOrder = new PackageOrder()

	@Output() orderChange = new EventEmitter()

	@Input()
	get order() {
		return this.item
	}

	set order(value: PackageOrder) {
		this.item = value
		this.orderChange.emit(this.item)
	}

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null

	@ViewChild('returnDateNode') returnDateRef: ElementRef
	returnDateDatepicker: any = null

	constructor(private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Package>(Package).then( (response: Package[]) =>
			this.packages = response.filter( (value:Package) => value.enable )
		)

		this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) =>
			this.hotels = response.filter( (value:Hotel) => value.enable )
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
		this.item.price = this.item.package && this.item.package.getPrice(this.item.date) || new Price()
	}

	changeTrip(): void {
		if (this.item.package)
			this.apiService.get<Package>(Package, this.item.package).then( (response: Package) => {
				this.item.package = response
				this.reloadPrice()
			})
		else
			this.reloadPrice()
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
}
