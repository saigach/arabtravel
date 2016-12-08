import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Trip } from '../../../../model/trip'
import { Point } from '../../../../model/point'

@Component({
	moduleId: module.id,
	selector: 'trip-item',
	templateUrl: '/app/component/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {

	points: Point[] = []

	item: Trip = new Trip()

	submitted: boolean = false

	get valid(): boolean {
		return  this.item.title.trim().length > 0 &&
				this.item.pointA &&
				this.item.pointB &&
				this.item.prices.length > 0
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

		this.apiService.get<Point>(Point).then( (response: Point[]) => {
			this.points = response

			if (id.toLowerCase() !== 'new')
				this.apiService.get<Trip>(Trip, id)
					.then((response: Trip) => {
						this.item = response
						this.item.pointA = this.points.find(
							value => value.id.toString() === this.item.pointA.id.toString()
						) || this.points[0] || null
						this.item.pointB = this.points.find(
							value => value.id.toString() === this.item.pointB.id.toString()
						) || this.points[0] || null
					})
					.catch(error => this.item = null)
		})


		// Promise.all([
		// 	this.apiService.get<Hotel>(Hotel),
		// 	this.apiService.get<Point>(Point)
		// ]).then( (response: any[]) => {
		// 	this.hotels = response[0]
		// 	this.points = response[1]

		// 	if (id.toLowerCase() !== 'new')
		// 		this.apiService.get<Trip>(Trip, id)
		// 			.then((response: Trip) => {
		// 				this.item = response
		// 				this.item.points = this.item.points.map(
		// 					point => this.points.find( value => value.id.toString() === point.id.toString() )
		// 				)
		// 			})
		// 			.catch(error => this.item = null)
		// })

		// $(this.pointsNestableRef.nativeElement).on('change.uk.nestable', (event, sortable, dragged, action) => {
		// 	if (action !== 'moved')
		// 		return
		// 	this.item.points = Array.prototype.reduce.call(
		// 		event.target.children,
		// 		(prev: Point[], node: HTMLElement) => prev.concat(this.item.points[node.getAttribute('index')] || null),
		// 		[]
		// 	)
		// })
	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Trip>(Trip, this.item).then((response: Trip) => this.back())
	}
}

