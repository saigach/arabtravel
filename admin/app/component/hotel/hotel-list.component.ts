import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { UUID } from '../../common/uuid'

import { Hotel } from '../../model/hotel'

const apiPath:string = 'hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-list',
	templateUrl: '/app/component/hotel/hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

	hotels: Hotel[] = []

	filter: string = ''

	constructor(private router: Router, private apiService: APIService) {}

	private getHotels(): Promise<Hotel[]> {
		return this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) => this.hotels = response)
	}

	ngOnInit(): void {
		this.getHotels()
	}

	add(): void {
		let hotel = new Hotel()
	}

	edit(hotel: Hotel): void {

	}

	delete(hotel: Hotel): void {

	}

	save(hotel: Hotel): void {

	}
}
