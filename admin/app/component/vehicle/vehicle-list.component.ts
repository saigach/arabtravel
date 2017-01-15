import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Vehicle } from '../../../../model/vehicle'

@Component({
	moduleId: module.id,
	selector: 'vehicle-list',
	templateUrl: '/app/component/vehicle/vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {

	items: Vehicle[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Vehicle>(Vehicle)
				.then((response: Vehicle[]) => this.items = response)
	}

	add(): void {
		this.apiService.update<Vehicle>(Vehicle, new Vehicle())
				.then((item: Vehicle) => this.items.push(item))
	}

	enable(item: Vehicle): void {
		this.apiService.command<Vehicle>(Vehicle, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	update(item: Vehicle): void {
		this.apiService.update<Vehicle>(Vehicle, item)
				.then( (newItem: Vehicle) => {
					for (let key in newItem)
						item[key] = newItem[key]
				})
	}

	delete(item: Vehicle): void {
		UIkit.modal.confirm(`Vehicle &laquo;${ item.title['en'] }&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Vehicle>(Vehicle, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



