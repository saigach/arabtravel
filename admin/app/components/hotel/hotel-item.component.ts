import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Location }               from '@angular/common'

import { APIService } from '../../services/api.service'

import { Hotel } from '../../models/hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-item',
	templateUrl: '/app/components/hotel/hotel-item.component.html'
})
export class HotelItemComponent implements OnInit {

	hotel: Hotel = null
	submitted: boolean = false

	constructor(private router: Router, private location: Location, private apiService: APIService) {}

	ngOnInit(): void {

	}

	goBack(): void {
		this.location.back()
	}

	onSubmit(): void {
		this.submitted = true
	}
}
