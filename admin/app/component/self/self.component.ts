import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

@Component({
	moduleId: module.id,
	selector: 'self',
	templateUrl: '/app/component/self/self.component.html'
})
export class SelfComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
