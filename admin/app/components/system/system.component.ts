import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

@Component({
	moduleId: module.id,
	selector: 'system',
	templateUrl: '/app/components/system/system.component.html'
})
export class SystemComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
