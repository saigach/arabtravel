import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Order, OrderType } from '../../../../model/order'

@Component({
	moduleId: module.id,
	selector: 'order-list',
	templateUrl: '/app/component/order/order-list.component.html'
})
export class OrderListComponent implements OnInit {

	items: Order[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Order>(Order).then( (response: Order[]) => this.items = response)
	}

	add(type: string = 'trip'): void {
		this.router.navigate(['/orders', type, 'new'])
	}

	select(item: Order): void {
		this.router.navigate(['/orders', item.type.id, item.id.uuid])
	}

	enable(item: Order): void {
		this.apiService.command<Order>(Order, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	delete(item: Order): void {
		UIkit.modal.confirm(`Order can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Order>(Order, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



