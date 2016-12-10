import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Human } from '../../../../model/human'

@Component({
	moduleId: module.id,
	selector: 'human-list',
	templateUrl: '/app/component/human/human-list.component.html'
})
export class HumanListComponent implements OnInit {

	items: Human[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		// this.apiService.get<Human>(Human).then( (response: Human[]) => this.items = response)
	}

	add(): void {
		this.router.navigate(['/people', 'new'])
	}

	select(item: Human): void {
		this.router.navigate(['/people', item.id.toString()])
	}

	enable(item: Human): void {
		this.apiService.command<Human>(Human, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: Human): void {
		UIkit.modal.confirm(`Human &laquo;${item.title}&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Human>(Human, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



