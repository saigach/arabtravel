import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

const defaultConfig = {
	exchangeRate: 1,
	processingFee: 10,
	sessionDuration: 300000
}

@Component({
	moduleId: module.id,
	selector: 'common-item',
	templateUrl: '/app/component/common/common-item.component.html'
})
export class HotelItemComponent implements OnInit {

	item: {} = {}

	constructor(
		private router: Router,
		private apiService: APIService
	) {}

	ngOnInit(): void {
		this.apiService.config().then((response: {}) => this.item = Object.assign({}, defaultConfig, response))
	}

	update(key: string): void {

	}
}

