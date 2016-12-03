import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../model/trip'

@Component({
	moduleId: module.id,
	selector: 'order-page',
	templateUrl: '/app/component/order/order-page.component.html'
})
export class OrderPageComponent implements OnInit {

	item: Trip = new Trip()

	submitted: boolean = false

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		let tripDataCurrent = localStorage.getItem("tripDataCurrent")
		if (!tripDataCurrent) {
			window.location.href = "/"
			return
		}
		let tripDataCurrentObject:{
			trip:any,
			date:string,
			adults:number,
			kids:number,
			infants:number
		} = JSON.parse(tripDataCurrent)
		//tripDataCurrentObject.trip = new Trip(tripDataCurrentObject.trip)

		console.dir(tripDataCurrentObject)
		this.apiService.get<Trip>(Trip,tripDataCurrentObject.trip.id._uuid).then( (response: Trip) =>  { this.item = response })
	}
}

