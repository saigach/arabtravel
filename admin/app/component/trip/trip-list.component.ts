import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../../model/trip'

@Component({
	moduleId: module.id,
	selector: 'trip-list',
	templateUrl: '/app/component/trip/trip-list.component.html'
})
export class TripListComponent implements OnInit {

	items: Trip[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) => this.items = response)
	}

	add(): void {
		this.router.navigate(['/trips', 'new'])
	}

	select(item: Trip): void {
		this.router.navigate(['/trips', item.id.uuid])
	}

	enable(item: Trip): void {
		this.apiService.command<Trip>(Trip, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: Trip): void {
		UIkit.modal.confirm(`Trip &laquo;${ item.title['en'] }&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Trip>(Trip, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



