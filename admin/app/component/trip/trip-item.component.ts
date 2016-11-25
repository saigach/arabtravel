import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Trip, TripType } from '../../../../model/trip'
import { Point } from '../../../../model/point'
import { Hotel } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'trip-item',
	templateUrl: '/app/component/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {

	hotels: Hotel[] = []
	points: Point[] = []

	tripType = TripType

	item: Trip = new Trip({
		points: [this.points[0] || new Point(), this.points[0] || new Point()]
	})

	@ViewChild('pointsNestable') pointsNestableRef: ElementRef

	submitted: boolean = false

	get valid(): boolean {
		return  this.item.title.trim().length > 0 &&
				this.item.points[0] && this.item.points[0].title.trim().length > 0 &&
				this.item.points[1] && this.item.points[1].title.trim().length > 0 &&
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

		Promise.all([
			this.apiService.get<Hotel>(Hotel),
			this.apiService.get<Point>(Point)
		]).then( (response: any[]) => {
			this.hotels = response[0]
			this.points = response[1]

			if (id.toLowerCase() !== 'new')
				this.apiService.get<Trip>(Trip, id)
					.then((response: Trip) => {
						this.item = response
						this.item.points = this.item.points.map(
							point => this.points.find( value => value.id.toString() === point.id.toString() )
						)
					})
					.catch(error => this.item = null)
		})

		$(this.pointsNestableRef.nativeElement).on('change.uk.nestable', (event, sortable, dragged, action) => {
			if (action !== 'moved')
				return
			this.item.points = Array.prototype.reduce.call(
				event.target.children,
				(prev: Point[], node: HTMLElement) => prev.concat(this.item.points[node.getAttribute('index')] || null),
				[]
			)
		})
	}

	back(): void {
		this.location.back()
	}

	addPoint(): void {
		this.item.points.push(this.points[0])
	}

	deletePoint(point: Point): void {
		this.item.points = this.item.points.filter(value => value !== point)
	}

	poitnChange(point: Point, newPoint: Point): void {
		let index = this.item.points.indexOf(point);
		if (index !== -1)
			this.item.points[index] = newPoint
	}

	typeChange(): void {
		if (this.item.type.maxPoints)
			this.item.points = this.item.points.slice(0, this.item.type.maxPoints)
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Trip>(Trip, this.item).then((response: Trip) => this.back())
	}
}

