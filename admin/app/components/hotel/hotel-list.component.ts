import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Hotel } from '../../models/hotel'

const apiPath:string = 'hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-list',
	templateUrl: '/app/components/hotel/hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

	hotels: Hotel[] = []

	filter: string = ''

	constructor(private router: Router, private apiService: APIService) {}

	getHotels(): void {
		this.apiService.getList(apiPath).then(hotels => {
			this.hotels = hotels.reduce( (prev: Hotel[], value: any ) => {
				prev.push(new Hotel(value))
				return prev
			}, [])
		})
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
