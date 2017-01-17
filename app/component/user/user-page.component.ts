import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { MLString } from '../../../model/common'
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

	ml: { [key:string]: MLString } = {}

	constructor(private router: Router, private apiService: APIService, private mlService: MLService ) {}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)
		this.apiService.me().then( (user: User) => this.user = user)
		this.apiService.get<Order>(Order).then( ( orders:Order[] ) => this.orders = orders )
	}
}

