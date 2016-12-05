import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../model/trip'

declare let tripselectorFormUiInit: any

@Component({
	moduleId: module.id,
	selector: 'tripselector-form',
	templateUrl: '/app/component/tripselector/tripselector-form.component.html'
})
export class TripSelectorFormComponent implements OnInit {

	items: Trip[] = []

	submitted: boolean = false

	tripData: {
		trip:Trip,
		date:string,
		adults:number,
		kids:number,
		infants:number
	} = {
		trip:null,
		date:"",
		adults: 0,
		kids: 0,
		infants: 0
	}

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) =>  { 
			this.items = response
			this.tripData.trip = this.items[0]
		})
	}


	tripSelectSubmit(): void {
		localStorage.setItem("tripDataCurrent", JSON.stringify(this.tripData))
		window.location.href = "/order"

	}
}

