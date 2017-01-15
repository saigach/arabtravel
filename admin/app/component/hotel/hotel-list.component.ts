import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Hotel } from '../../../../model/hotel'
import { MLPipe } from '../../pipe/ml.pipe'

@Component({
	moduleId: module.id,
	selector: 'hotel-list',
	templateUrl: '/app/component/hotel/hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

	items: Hotel[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) => this.items = response)
	}

	add(): void {
		this.router.navigate(['/hotels', 'new'])
	}

	select(item: Hotel): void {
		this.router.navigate(['/hotels', item.id.uuid])
	}

	enable(item: Hotel): void {
		this.apiService.command<Hotel>(Hotel, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: Hotel): void {
		UIkit.modal.confirm(`Hotel &laquo;${ item.title['en'] }&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Hotel>(Hotel, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



