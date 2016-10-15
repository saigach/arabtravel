import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../model/trip'

@Component({
	moduleId: module.id,
	selector: 'trip-list',
	templateUrl: '/app/component/trip/trip-list.component.html'
})
export class TripListComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}

	add(): void {

	}
}
