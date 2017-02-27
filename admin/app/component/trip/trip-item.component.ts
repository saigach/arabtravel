import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { File, MLString } from '../../../../model/common'
import { Trip, TripType } from '../../../../model/trip'
import { Price } from '../../../../model/price'
import { Point } from '../../../../model/point'
@Component({
	moduleId: module.id,
	selector: 'trip-item',
	templateUrl: '/app/component/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {

	types: TripType[] = TripType.List

	points: Point[] = []

	item: Trip = new Trip()

	submitted: boolean = false

	get valid(): boolean {
		return  this.item.pointA &&
				this.item.pointB &&
				this.item.prices.length > 0
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {}

	@ViewChild('departureTimeNode') departureTimeRef: ElementRef
	@ViewChild('returnTimeNode') returnTimeRef: ElementRef

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'] || null
		if (!id) {
			return
		}

		this.apiService.get<Point>(Point).then( (response: Point[]) => {
			this.points = response

			if (id.toLowerCase() !== 'new')
				this.apiService.get<Trip>(Trip, id)
					.then((response: Trip) => {
						this.item = response
						this.item.pointA = this.item.pointA
										&& this.points.find(value => value.id.uuid === this.item.pointA.id.uuid)
										|| null
						this.item.pointB = this.item.pointB
										&& this.points.find(value => value.id.uuid === this.item.pointB.id.uuid)
										|| null
					})
					.catch(error => this.item = null)
		})

		this.departureTimeRef.nativeElement.addEventListener('change', event => {
			let date = new Date(this.item.departureTime)
			date.setHours(event.target.valueAsDate.getUTCHours())
			date.setMinutes(event.target.valueAsDate.getUTCMinutes())
			this.item.departureTime = date
		})

		this.returnTimeRef.nativeElement.addEventListener('change', event => {
			let date = new Date(this.item.returnTime)
			date.setHours(event.target.valueAsDate.getUTCHours())
			date.setMinutes(event.target.valueAsDate.getUTCMinutes())
			this.item.returnTime = date
		})
	}

	addPrice(): void {
		this.item.prices.push(new Price())
	}

	deletePrice(price: Price): void {
		this.item.prices = this.item.prices.filter(value => value !== price)
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

