import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../model/trip'

@Component({
	moduleId: module.id,
	selector: 'tripselector-form',
	templateUrl: '/app/component/tripselector/tripselector-form.component.html'
})
export class TripSelectorFormComponent implements OnInit {
	trips: Trip[] = []

	oneWayTrip: Trip = null
	twoWayTrip: Trip = null
	packageTrip: Trip = null

	date: Date = new Date()

	adults: number = 0
	kinds: number = 0
	infants: number = 0

	submitted: boolean = false

	tripSelect: any = {
		oneWayTrip: true,
		twoWayTrip: false,
		packageTrip: false
	}

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) =>  {
			this.trips = response
			if (this.trips.length <= 0)
				return

			this.oneWayTrip = this.trips[0]
			this.twoWayTrip = this.trips[0]
			this.packageTrip = this.trips[0]
		})
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		let trip: Trip = this.oneWayTrip

		localStorage.setItem('currentOrder', JSON.stringify({
			trip: trip.id.toString(),
			date: this.date,
			peopleCount: (this.adults + this.kinds + this.infants) || 1
		}))

		window.location.href = "/order"
	}

	toggleTripSelected(i: number): void {
		for (var key in this.tripSelect) {
		    if (this.tripSelect.hasOwnProperty(key)) {
		        this.tripSelect[key] = false
		    }
		}
		this.tripSelect[i] = true
		console.log(this.tripSelect)
	}
}
