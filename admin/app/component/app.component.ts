import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../service/api.service'

import { User } from '../../../model/user'

@Component({
	selector: 'app',
	templateUrl: '/app/component/app.component.html'
})
export class AppComponent {
	constructor(private router: Router,
				private apiService: APIService
				) { }

	self: User = null

	ngOnInit(): void {

		this.apiService.get<User>(User, 'self')
			.then((response: User) => this.self = response)
			.catch(error => this.self = null)
	}

	select(): void {
		this.router.navigate(['/users', this.self.id.uuid])
	}
}
