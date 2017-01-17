import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { str2Date, SearchData, newDate, MLString } from '../../../model/common'
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

	private getPoints(type: 'A' | 'B', otherPoint: Point): Point[] {
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

		return this.getPoints('B', this.pointA)
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

	get tripList(): Point[] {
		return this.getTrips(this.pointA, this.pointB)
	}

	get valid(): boolean {
		return !!this.pointA
			&& !!this.pointB
			&& this.peopleCount.reduce( (prev: boolean, value: PeopleCount) =>
					value.ageGroup.id === 'adults' && value.count > 0 ? true : prev,
					false
				)
	}

	ml: { [key:string]: MLString } = {}

	constructor(private router: Router, private apiService: APIService, private mlService: MLService) {}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)

		let searchData: SearchData = null

		try {
			searchData = JSON.parse(localStorage.getItem('searchData'))
		} catch(error) {
			searchData = null
		}

		if (searchData) {
			console.dir(searchData)
		}

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
			} ).filter( (trip:Trip) => trip.pointA && trip.pointB && trip.package)

			if (searchData) {
				this.anyDate = !!searchData.anyDate

				let date = newDate(searchData.departureDate || null) || new Date()
				this.departureDate = date

				let pointAuuid = searchData.pointA.trim().toLowerCase()

				if (pointAuuid) {
					this.pointA = this.APoints.find( (value:Point) => value.id.uuid === pointAuuid )

					let pointBuuid = searchData.pointB.trim().toLowerCase()

					if (pointBuuid)
						this.pointB = this.BPoints.find( (value:Point) => value.id.uuid === pointBuuid )
				}

				if (searchData.peopleCount instanceof Array)
				this.peopleCount.forEach( (peopleCount:PeopleCount) => {
					let pc = searchData.peopleCount.find(
						(value:{ ageGroup: string, count: number }) => value.ageGroup === peopleCount.ageGroup.id
					)
					if (pc)
						peopleCount.count = pc.count || peopleCount.count
				})


			}
		})

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event =>
			this.departureDate = str2Date(event.target.value)
		)
	}

	select(trip: Trip): void {

	}
}
