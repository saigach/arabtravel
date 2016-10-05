import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Trip } from '../../models/trip'

@Component({
	moduleId: module.id,
	selector: 'trip-item',
	templateUrl: '/app/components/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
