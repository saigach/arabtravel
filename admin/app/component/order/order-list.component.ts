import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Order } from '../../model/order'

@Component({
	moduleId: module.id,
	selector: 'order-list',
	templateUrl: '/app/component/order/order-list.component.html'
})
export class OrderListComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}

	add(): void {

	}
}
