import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Order } from '../../models/order'

@Component({
	moduleId: module.id,
	selector: 'order-item',
	templateUrl: '/app/components/order/order-item.component.html'
})
export class OrderItemComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
