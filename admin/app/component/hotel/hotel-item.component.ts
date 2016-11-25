import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Hotel } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-item',
	templateUrl: '/app/component/hotel/hotel-item.component.html'
})
export class HotelItemComponent implements OnInit {

	item: Hotel = new Hotel()

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
			this.apiService.get<Hotel>(Hotel, id)
				.then((response: Hotel) => this.item = response)
				.catch(error => this.item = null)


	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Hotel>(Hotel, this.item).then((response: Hotel) => this.back())
	}
}

