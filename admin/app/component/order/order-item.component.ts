import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Order } from '../../model/order'

@Component({
	moduleId: module.id,
	selector: 'project-item',
	templateUrl: '/app/component/order/order-item.component.html'
})
export class OrderItemComponent implements OnInit {

	item: Order = new Order()

	submitted: boolean = false

	get valid(): boolean {
		return this.item.title.length > 0
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {}

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'] || null
		if (!id)
			return

		if (id.toLowerCase() !== 'new')
			this.apiService.get<Order>(Order, id)
				.then((response: Order) => this.item = response)
				.catch(error => this.item = null)


	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Human>(Human, this.item).then((response: Human) => this.back())
	}
}

