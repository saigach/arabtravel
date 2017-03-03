import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../../model/common'
import { PackageOrder, PeolpeInRoom } from '../../../../model/package-order'
import { Package } from '../../../../model/package'
import { Price } from '../../../../model/price'
import { Human } from '../../../../model/human'

@Component({
	moduleId: module.id,
	selector: 'order-package',
	templateUrl: '/app/component/order/order-package.component.html'
})
export class OrderPackageComponent implements OnInit {

	packages: Package[] = []

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

	constructor(private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Package>(Package).then( (response: Package[]) =>
			this.packages = response.filter( (value:Package) => value.enable )
		)

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event => {
			this.item.departureDate = str2Date(event.target.value)
			this.reloadPrice()
		})
	}

	reloadPrice(): void {
		this.item.price = this.item.package && this.item.package.getPrice(this.item.date) || new Price()
	}

	packageChange(): void {
		if (this.item.package)
			this.apiService.get<Package>(Package, this.item.package).then( (response: Package) => {
				this.item.package = response
				this.reloadPrice()
			})
		else
			this.reloadPrice()
	}

	addRoom(): void {
		if (!this.item.package || !this.item.package.hotel || this.item.package.hotel.rooms.length <= 0)
			return

		this.item.peopleInRoom.push(new PeolpeInRoom({ room: this.item.package.hotel.rooms[0] }))
	}

	deleteRoom(peolpeInRoom: PeolpeInRoom): void {
		this.item.peopleInRoom = this.item.peopleInRoom.filter(value => value !== peolpeInRoom)
	}
}
