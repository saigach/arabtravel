import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { MLString } from '../../../model/common'
import { Order } from '../../../model/order'
import { User } from '../../../model/user'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

@Component({
	moduleId: module.id,
	selector: 'user-page',
	templateUrl: '/app/component/user/user-page.component.html'
})
export class UserPageComponent implements OnInit {

	orders: Order[] = []
	user: User = null

	ml: { [key:string]: MLString } = {}

	_currency: string = 'usd'

	get currency():string {
		return (this.ml && this._currency in this.ml) ? this.ml[this._currency][lang] : this._currency
	}

	set currency(value: string) {
		this._currency = value ? value : 'usd'
		// this.ref.detectChanges()
	}

	exchangeRate(order: Order = null): number {
		if (this._currency === 'jod')
			return 1

		return order && order.exchangeRate || 0
	}

	constructor(private router: Router, private apiService: APIService, private mlService: MLService ) {
		this.currency = localStorage && localStorage.getItem('currency') || null
	}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)
		this.apiService.me().then( (user: User) => this.user = user)
		this.apiService.get<Order>(Order).then( ( orders:Order[] ) => this.orders = orders )

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-set]'),
			currencySetNode => currencySetNode.addEventListener('click', event =>{
				event.preventDefault()
				this.currency = currencySetNode.getAttribute('currency-set') || null
			})
		)
	}
}

