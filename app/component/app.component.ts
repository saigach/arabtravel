import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../service/api.service'

@Component({
	selector: 'app',
	templateUrl: '/app/component/app.component.html'
})
export class AppComponent {
	constructor(private router: Router,
				private apiService: APIService
				) { }

	ngOnInit(): void {
	}
}
