import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Order } from '../../../model/order'
import { User } from '../../../model/user'

@Component({
	moduleId: module.id,
	selector: 'user-page',
	templateUrl: '/app/component/user/user-page.component.html'
})
export class UserPageComponent implements OnInit {

	orders: Order[] = []
	user: User = null

	constructor(private router: Router, private apiService: APIService) {
		console.log(111)
	}

	ngOnInit(): void {
		this.apiService.me().then( (user: User) => this.user = user)
		this.apiService.get<Order>(Order).then( ( orders:Order[] ) => this.orders = orders )
	}
}

