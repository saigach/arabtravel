import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Point } from '../../../../model/point'

@Component({
	moduleId: module.id,
	selector: 'point-list',
	templateUrl: '/app/component/point/point-list.component.html'
})
export class PointListComponent implements OnInit {

	items: Point[] = []

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Point>(Point)
				.then((response: Point[]) => this.items = response)
	}

	add(): void {
		this.apiService.update<Point>(Point, new Point())
				.then((item: Point) => this.items.push(item))
	}

	enable(item: Point): void {
		this.apiService.command<Point>(Point, item, 'enable')
				.then((response: any) => item.enable = response.enable)
	}

	update(item: Point): void {
		this.apiService.update<Point>(Point, item)
				.then( (newItem: Point) => {
					for (let key in newItem)
						item[key] = newItem[key]
				})
	}

	delete(item: Point): void {
		UIkit.modal.confirm(`Point &laquo;${item.title}&raquo; can be deleted.<br>Are you sure?`, () =>
			this.apiService.delete<Point>(Point, item).then(() =>
				this.items = this.items.filter(value => value !== item)
			)
		)
	}
}



