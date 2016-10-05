import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { User } from '../../common/user'

@Component({
	moduleId: module.id,
	selector: 'user-item',
	templateUrl: '/app/components/user/user-item.component.html'
})
export class UserItemComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
