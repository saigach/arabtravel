import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Static } from '../../../../model/static'

@Component({
	moduleId: module.id,
	selector: 'static-list',
	templateUrl: '/app/component/static/static-list.component.html'
})
export class StaticListComponent implements OnInit {

	items: Static[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Static>(Static).then( (response: Static[]) => this.items = response)
	}

	add(): void {
		this.router.navigate(['/static', 'new'])
	}

	select(item: Static): void {
		this.router.navigate(['/static', item.id.uuid])
	}

	enable(item: Static): void {
		this.apiService.command<Static>(Static, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: Static): void {
		UIkit.modal.confirm(`Static page &laquo;${ item.title['en'] }&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Static>(Static, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



