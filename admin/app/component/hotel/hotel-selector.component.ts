import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'
import { Hotel } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-selector',
	templateUrl: '/app/component/hotel/hotel-selector.component.html'
})
export class HotelSelectorComponent implements OnInit {

	items: Hotel[] = []

	item: Hotel = null

	@Output() hotelChange = new EventEmitter()

	@Input()
	get hotel() {
		return this.item
	}

	set hotel(value: Hotel) {
		this.item = value
		this.hotelChange.emit(this.item)
	}

	constructor(private apiService: APIService) {

	}

	ngOnInit(): void {
		this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) =>
			this.items = response.filter( (value: Hotel) => value.enable )
		)
	}

	select(item: Hotel): void {
		this.apiService.get<Hotel>(Hotel, item).then( (response: Hotel) => this.hotel = response)
	}
}



