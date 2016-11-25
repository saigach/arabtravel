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

	items: Trip[] = []

	submitted: boolean = false

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) => this.items = response)
	}
}

