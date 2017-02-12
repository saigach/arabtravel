import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Package } from '../../../../model/package'

@Component({
	moduleId: module.id,
	selector: 'package-list',
	templateUrl: '/app/component/package/package-list.component.html'
})
export class PackageListComponent implements OnInit {

	items: Package[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Package>(Package).then( (response: Package[]) => this.items = response)
	}

	add(): void {
		this.router.navigate(['/packages', 'new'])
	}

	select(item: Package): void {
		this.router.navigate(['/packages', item.id.uuid])
	}

	enable(item: Package): void {
		this.apiService.command<Package>(Package, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: Package): void {
		UIkit.modal.confirm(`Package &laquo;${ item.title['en'] }&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Package>(Package, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



