import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../model/trip'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'

type TripType = 'oneway' | 'round' | 'package'

@Component({
	moduleId: module.id,
	selector: 'tripselector-form',
	templateUrl: '/app/component/tripselector/tripselector-form.component.html'
})
export class TripSelectorFormComponent implements OnInit {

	_type: TripType = 'oneway'

	get type(): TripType {
		return this._type
	}

	set type(value: TripType) {
		this._type = value
		this.pointA = null
		this.pointB = null
	}

	trips: Trip[] = []

	private getTrips(pointA: Point = null, pointB: Point = null): Trip[] {
		return this.trips.filter( (trip: Trip) =>
			trip.pointA && (!pointA || trip.pointA.id.uuid === pointA.id.uuid) &&
			trip.pointB && (!pointB || trip.pointB.id.uuid === pointB.id.uuid)
		)
	}

	_pointA: Point = null

	get pointA(): Point {
		return this._pointA
	}

	set pointA(value: Point) {
		this._pointA = value
		this.pointB = null
		this.vehicle = null
	}

	_pointB: Point = null

	get pointB(): Point {
		return this._pointB
	}

	set pointB(value: Point) {
		this._pointB = value
		this.vehicle = null
	}

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
		switch (this.type) {
			case 'package':
			case 'oneway':
				return this.getPoints('A', null)
			case 'round':
				return this.getPoints('A', null).filter( (pointA:Point) =>
					this.getTrips(pointA).reduce( (prev: boolean, trip: Trip) =>
						prev || this.getTrips(trip.pointB, pointA).length > 0,
						false
					)
				)
			default:
				return []
		}
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		switch (this.type) {
			case 'package':
				return this.getPoints('B', null)
			case 'oneway':
				return this.getPoints('B', this.pointA)
			case 'round':
				return this.getPoints('B', this.pointA).filter( (pointB:Point) =>
					this.getTrips(pointB, this.pointA).length > 0
				)
			default:
				return []
		}
	}

	anyDate: boolean = false

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null
	departureDate: Date = new Date()

	@ViewChild('returnDateNode') returnDateRef: ElementRef
	returnDateDatepicker: any = null
	returnDate: Date = new Date()

	adults: number = 0
	kinds: number = 0
	infants: number = 0

	_vehicleList: Vehicle[] = []

	get vehicleList(): Vehicle[] {
		return this._vehicleList
	}

	vehicle: Vehicle = null

	submitted: boolean = false

	get valid(): boolean {
		return !!this.pointA
			&& !!this.pointB
			&& this.adults > 0
			&& this.kinds >= 0
			&& this.infants >= 0
	}

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Trip>(Trip).then( ( trips:Trip[] ) => this.trips = trips )

		const newDate = value => {
			let [day, month, year] = value.split('.')
			let date = new Date(year, month, day)

			if ( !Number.isNaN( date.getTime() ) )
				return date

			return null
		}

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event =>
			this.departureDate = newDate(event.target.value)
		)

		this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.returnDateDatepicker.on('hide.uk.datepicker', event =>
			this.returnDate = newDate(event.target.value)
		)
	}

	get currentOrder(): {
		type: TripType,
		pointA: string,
		pointB: string,
		anyDate: boolean,
		departureDate: Date,
		returnDate: Date,
		vehicle: string,
		peopleCount: number
	} {
		return {
			type: this.type,
			pointA: this.pointA && this.pointA.id.uuid || null,
			pointB: this.pointB && this.pointB.id.uuid || null,
			anyDate: this.anyDate,
			departureDate: this.departureDate,
			returnDate: this.returnDate,
			vehicle: this.vehicle && this.vehicle.id.uuid || null,
			peopleCount: (this.adults + this.kinds + this.infants) || 1
		}
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder))
		window.location.href = "/order"
	}
}
