import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { str2Date, MLString, SearchData } from '../../../model/common'
import { Trip, TripType } from '../../../model/trip'
import { Package } from '../../../model/package'
import { OrderType } from '../../../model/order'
import { TripOrder } from '../../../model/trip-order'
import { PackageOrder } from '../../../model/package-order'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'
import { Human } from '../../../model/human'
import { Cost } from '../../../model/price'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

@Component({
	moduleId: module.id,
	selector: 'tripselector-form',
	templateUrl: '/app/component/tripselector/tripselector-form.component.html'
})
export class TripSelectorFormComponent implements OnInit {

	ml: { [key:string]: MLString } = {}

	orderType: OrderType = OrderType.List[0]
	tripType: TripType = TripType.List[0]

	checkType(typeId: 'trip' | 'package', tripTypeId: string = null ): boolean {
		return this.orderType === OrderType.getOrderType(typeId) &&
				(tripTypeId === null || this.tripType === TripType.getTripType(tripTypeId))
	}

	setType(type: 'trip' | 'package', tripTypeId: string = null): void {
		this.orderType = OrderType.getOrderType(type)
		if (tripTypeId)
			this.tripType = TripType.getTripType(tripTypeId)
	}

	packages: Package[] = []
	trips: Trip[] = []

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null
	departureDate = new Date()

	@ViewChild('returnDateNode') returnDateRef: ElementRef
	returnDateDatepicker: any = null
	returnDate = new Date()

	constructor(private router: Router, private apiService: APIService, private mlService: MLService) {}

	ngOnInit(): void {

		this.mlService.get().then( ml => this.ml = ml)
		this.apiService.get<Trip>(Trip).then( (response: Trip[]) => this.trips = response )
		this.apiService.get<Package>(Package).then( (response: Package[]) => this.packages = response )

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event =>
			this.departureDate = str2Date(event.target.value)
		)

		this.returnDateDatepicker.on('hide.uk.datepicker', event =>
			this.returnDate = str2Date(event.target.value)
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

	private _pointB: Point = null

	get pointB(): Point {
		return this._pointB
	}

	set pointB(value: Point) {
		this._pointB = value
		this.vehicle = null
	}

	get APoints(): Point[] {
		switch (this.orderType) {
			case OrderType.getOrderType('trip'):
				return this.trips.reduce(
					(prev: Point[], value: Trip ) =>
						value.type === this.tripType &&
						!prev.find( (prevValue: Point) => prevValue.id.equal(value.pointA.id) ) ?
							prev.concat(value.pointA) : prev,
					[]
				)
			case OrderType.getOrderType('package'):
				return this.packages.reduce(
					(prev: Point[], value: Package ) =>
						!prev.find( (prevValue: Point) => prevValue.id.equal(value.pointA.id) ) ?
							prev.concat(value.pointA) : prev,
					[]
				)

		}
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		switch (this.orderType) {
			case OrderType.getOrderType('trip'):
				return this.trips.reduce(
					(prev: Point[], value: Trip ) =>
						value.type === this.tripType && value.pointA &&
						value.pointA.id.equal(this.pointA.id) ? prev.concat(value.pointB) : prev,
					[]
				)
			case OrderType.getOrderType('package'):
				return this.packages.reduce(
					(prev: Point[], value: Package ) =>
						value.pointA && value.pointA.id.equal(this.pointA.id) &&
						!prev.find( (prevValue: Point) => prevValue.id.equal(value.pointB.id) ) ?
							prev.concat(value.pointB) : prev,
					[]
				)

		}
	}

	get trip(): Trip {
		if (!this.pointA || !this.pointB)
			return null

		if (this.orderType !== OrderType.getOrderType('trip'))
			return null

		return this.trips.find( (value: Trip) =>
			value.type === this.tripType &&
			value.pointA.id.equal(this.pointA.id) &&
			value.pointB.id.equal(this.pointB.id)
		) || null

	}

	get vehicleList(): Vehicle[] {
		if (!this.trip)
			return []

		let price = this.trip.getPrice(this.departureDate || null)

		return price.costs.reduce( (prev: Vehicle[], value: Cost) =>
			value.key instanceof Vehicle ? prev.concat(value.key) : prev,
			[]
		)
	}

	vehicle: Vehicle = null

	anyDate: boolean = false

	kidsAges: { value: number }[] = []

	adults: number = 1
	kids: number = 0

	resetKidsAges(): void {
		this.kidsAges = Array.apply(null, {length: this.kids}).map( () => ({ value: 0 }) )
	}

	submitted: boolean = false

	get valid(): boolean {
		return !!this.pointA
			&& !!this.pointB
			&& this.adults > 0
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		switch (this.orderType) {
			case OrderType.getOrderType('trip'):

				let tripOrder = new TripOrder({
					trip: this.trip,
					people: Array.apply(null, {length: this.adults}).map( () => new Human())
							.concat( this.kidsAges.map( value => new Human({ age: value.value })) ),
					departureDate: this.departureDate,
					returnDate: this.returnDate,
					price: this.trip.getPrice(this.departureDate),
					vehicle: this.vehicle
				})

				localStorage.setItem('currentOrder', tripOrder.toString())
				window.location.href = `/${lang}/order`
				return

			case OrderType.getOrderType('package'):

				let searchData: SearchData = {
					pointA: this.pointA && this.pointA.id.uuid || null,
					pointB: this.pointB && this.pointB.id.uuid || null,
					departureDate: this.departureDate,
					anyDate: this.anyDate,
					adults: this.adults,
					kidsAges: this.kidsAges
				}

				localStorage.setItem('searchData', JSON.stringify(searchData))
				window.location.href = `/${lang}/package-list`
		}
	}
}
