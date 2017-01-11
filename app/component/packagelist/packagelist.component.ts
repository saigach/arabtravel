import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { str2Date } from '../../../model/common'
import { Order, Shift, PaymentType } from '../../../model/order'
import { Trip, Price, VehicleCost } from '../../../model/trip'
import { Point } from '../../../model/point'
import { Human, AgeGroup } from '../../../model/human'
import { Hotel } from '../../../model/hotel'

type PeopleCount = { ageGroup: AgeGroup, count: number }

@Component({
	moduleId: module.id,
	selector: 'package-list',
	templateUrl: '/app/component/packagelist/packagelist.component.html'
})
export class PackageListComponent implements OnInit {

	points: Point[] = []
	trips: Trip[] = []

	private getTrips(pointA: Point = null, pointB: Point = null): Trip[] {
		return this.trips.filter( (trip: Trip) =>
			trip.package === true &&
			trip.pointA && (!pointA || trip.pointA.id.uuid === pointA.id.uuid) &&
			trip.pointB && (!pointB || trip.pointB.id.uuid === pointB.id.uuid)
		)
	}

	private _pointA: Point = null

	get pointA(): Point {
		return this._pointA
	}

	set pointA(value: Point) {
		this._pointA = value
		this.pointB = null
	}

	pointB: Point = null

	private getPoints(type: 'A' | 'B', otherPoint: Point, isPackage: boolean = false): Point[] {
		let points = this.getTrips().reduce( (prev: Point[], trip: Trip) => {
			if (!otherPoint || trip[type === 'A' ? 'pointB' : 'pointA'].id.uuid === otherPoint.id.uuid )
				return prev.concat(trip[type === 'A' ? 'pointA' : 'pointB'])
			return prev
		}, [])

		return points.reduce( (prev: Point[], currentPoint: Point) =>
			prev.find( (point: Point) =>
				currentPoint.id.uuid === point.id.uuid
			) ? prev : prev.concat(currentPoint),
			[]
		)
	}

	get APoints(): Point[] {
		return this.getPoints('A', null)
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		return this.getPoints('B', null)
	}

	anyDate: boolean = false

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null
	departureDate: Date = new Date()

	peopleCount: PeopleCount[] = AgeGroup.List.reduce(
		( prev:PeopleCount[], value:AgeGroup ) =>
			prev.concat({
				ageGroup: value,
				count: value.id === 'adults' ? 1 : 0
			}),
		[]
	)

	submitted: boolean = false

	get valid(): boolean {
		return !!this.pointA
			&& !!this.pointB
			&& this.peopleCount.reduce( (prev: boolean, value: PeopleCount) =>
					value.ageGroup.id === 'adults' && value.count > 0 ? true : prev,
					false
				)
	}

	constructor(private router: Router, private apiService: APIService) {

	}

	ngOnInit(): void {

		Promise.all([
			this.apiService.get<Point>(Point).then( (response: Point[]) => this.points = response ),
			this.apiService.get<Trip>(Trip).then( (response: Trip[]) => this.trips = response ),
		]).then( () => {
			this.trips = this.trips.map( (trip:Trip) => {
				trip.pointA = trip.pointA
					&& this.points.find(value => value.id.uuid === trip.pointA.id.uuid)
					|| null
				trip.pointB = trip.pointB
					&& this.points.find(value => value.id.uuid === trip.pointB.id.uuid)
					|| null
				return trip
			} ).filter( (trip:Trip) => trip.pointA && trip.pointB)
		})

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event =>
			this.departureDate = str2Date(event.target.value)
		)
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true
	}
}
