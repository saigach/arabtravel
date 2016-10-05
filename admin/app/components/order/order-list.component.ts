import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Order } from '../../models/order'

@Component({
	moduleId: module.id,
	selector: 'order-list',
	templateUrl: '/app/components/order/order-list.component.html'
})
export class OrderListComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}

	add(): void {

	}
}
