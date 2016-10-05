import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Trip } from '../../models/trip'

@Component({
	moduleId: module.id,
	selector: 'trip-list',
	templateUrl: '/app/components/trip/trip-list.component.html'
})
export class TripListComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}

	add(): void {

	}
}
