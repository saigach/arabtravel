import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

const defaultConfig = {
	exchangeRate: 1,
	exchangeRateSAR: 1,
	exchangeRateEGP: 1,
	processingFee: 10,
	sessionDuration: 300000,
	egyptianMarkUp: 0
}

@Component({
	moduleId: module.id,
	selector: 'common-item',
	templateUrl: '/app/component/common/common.component.html'
})
export class CommonComponent implements OnInit {

	item: {} = {}

	constructor(
		private router: Router,
		private apiService: APIService
	) {}

	ngOnInit(): void {
		this.apiService.config().then((response: {}) => this.item = Object.assign({}, defaultConfig, response))
	}

	update(key: string): void {
		if (!(key in this.item))
			return

		this.apiService.config({ [key]: this.item[key] }).then((response: {}) => this.item = Object.assign({}, this.item, response))
	}
}

