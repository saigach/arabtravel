import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Trip } from '../../model/trip'

@Component({
	moduleId: module.id,
	selector: 'project-item',
	templateUrl: '/app/component/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {

	item: Trip = new Trip()

	submitted: boolean = false

	get valid(): boolean {
		return this.item.title.length > 0
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {}

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'] || null
		if (!id)
			return

		if (id.toLowerCase() !== 'new')
			this.apiService.get<Trip>(Trip, id)
				.then((response: Trip) => this.item = response)
				.catch(error => this.item = null)


	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Trip>(Trip, this.item).then((response: Trip) => this.back())
	}
}

