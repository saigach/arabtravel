import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { User, Role } from '../../../../model/user'

@Component({
	moduleId: module.id,
	selector: 'user-list',
	templateUrl: '/app/component/user/user-list.component.html'
})
export class UserListComponent implements OnInit {
	items: User[] = []

	getIcons(item: User){
		return item.roles.reduce( (prev: string[], value: Role) => value.icon ? prev.concat(value.icon) : prev, [] )
	}

	constructor(
		private router: Router,
		private apiService: APIService
	) {}

	ngOnInit(): void {
		this.apiService.get<User>(User).then( (response: User[]) => this.items = response)
	}

	add(): void {
		this.router.navigate(['/users', 'new'])
	}

	select(item: User): void {
		this.router.navigate(['/users', item.id.uuid])
	}

	enable(item: User): void {
		this.apiService.command<User>(User, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: User): void {
		UIkit.modal.confirm(`Users &laquo;${item.title}&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<User>(User, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}
