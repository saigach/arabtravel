import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Trip, TripType } from '../../model/trip'
import { Point } from '../../model/point'
import { Hotel } from '../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'trip-item',
	templateUrl: '/app/component/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {

	hotels: Hotel[] = []

	tripType = TripType

	item: Trip = new Trip({
		points: [new Point(), new Point()]
	})

	@ViewChild('pointsNestable') pointsNestableRef: ElementRef

	submitted: boolean = false

	get valid(): boolean {
		return  this.item.title.trim().length > 0 &&
				this.item.points.length > 1 &&
				this.item.points[0].title.trim().length > 0 &&
				this.item.points[1].title.trim().length > 0 &&
				this.item.prices.length > 0
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {}

	ngOnInit(): void {
		this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) => this.hotels = response)

		let id: string = this.route.snapshot.params['id'] || null
		if (!id)
			return

		if (id.toLowerCase() !== 'new')
			this.apiService.get<Trip>(Trip, id)
				.then((response: Trip) => this.item = response)
				.catch(error => this.item = null)

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
		this.item.points.push(new Point())
	}

	deletePoint(point: Point): void {
		this.item.points = this.item.points.filter(value => value !== point)
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

