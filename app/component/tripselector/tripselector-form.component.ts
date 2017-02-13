import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { str2Date, SearchData, MLString } from '../../../model/common'
import { Trip, TripType } from '../../../model/trip'
import { Package } from '../../../model/package'
import { OrderType, PeopleCount } from '../../../model/order'
import { TripOrder } from '../../../model/trip-order'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'
import { VehicleCost} from '../../../model/price'
import { Human, AgeGroup } from '../../../model/human'

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

	checkType(order: string, trip: string = null): boolean {
		return this.orderType.id === order && (trip === null || this.tripType.id === trip)
	}

	setType(order: string, trip: string = null): void {
		this.orderType = OrderType.getOrderType(order)
		if (trip)
			this.tripType = TripType.getTripType(trip)

		this.pointA = null
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
						value.type === this.tripType ? prev.concat(value.pointA) : prev,
					[]
				)
			case OrderType.getOrderType('package'):
				return this.packages.reduce(
					(prev: Point[], value: Package ) =>
						prev.concat(value.pointA),
					[]
				)

		}
	}

	get BPoints(): Point[] {
		switch (this.orderType) {
			case OrderType.getOrderType('trip'):
				return this.trips.reduce(
					(prev: Point[], value: Trip ) =>
						value.type === this.tripType && value.pointA === this.pointA ? prev.concat(value.pointB) : prev,
					[]
				)
			case OrderType.getOrderType('package'):
				return this.packages.reduce(
					(prev: Point[], value: Package ) =>
						value.pointA === this.pointA ? prev.concat(value.pointB) : prev,
					[]
				)

		}
	}

	get trip(): Trip {
		if (this.orderType === OrderType.getOrderType('trip'))
			return this.trips.find( (value: Trip) =>
				value.type === this.tripType &&
				value.pointA === this.pointA &&
				value.pointB === this.pointB
			) || null
		return null
	}

	get vehicleList(): Vehicle[] {
		if (!this.trip)
			return []

		let price = this.trip.getPrice(this.departureDate || null)

		return price.vehicles.reduce( (prev: Vehicle[], value: VehicleCost) =>
			value.enable ? prev.concat(value.vehicle) : prev,
			[]
		)
	}

	vehicle: Vehicle = null

	anyDate: boolean = false

	peopleCount: PeopleCount[] = AgeGroup.List.reduce(
		( prev: PeopleCount[], value: AgeGroup ) =>
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

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		switch (this.orderType) {
			case OrderType.getOrderType('trip'):

				let order = new TripOrder({
					trip: this.trip,
					people: this.peopleCount.reduce(
						(prev: Human[], value:PeopleCount) => {
							for(let i = 0; i < value.count; i++)
								prev.push(new Human({ defaultAgeGroup: value.ageGroup }))
							return prev
						},
						[]
					),
					departureDate: this.departureDate,
					returnDate: this.returnDate,
					price: this.trip.getPrice(this.departureDate),
					vehicle: this.vehicle
				})

				localStorage.setItem('currentOrder', order.toString())
				window.location.href = `/${lang}/order`
				return

			case OrderType.getOrderType('package'):

				let searchData: SearchData = {
					pointA: this.pointA && this.pointA.id.uuid || null,
					pointB: this.pointB && this.pointB.id.uuid || null,
					departureDate: this.departureDate,
					anyDate: this.anyDate,
					peopleCount: this.peopleCount.reduce( (prev:{ ageGroup: string, count: number }[], value: PeopleCount ) =>
						prev.concat({ ageGroup: value.ageGroup.id, count: value.count }),
						[]
					)
				}

				localStorage.setItem('searchData', JSON.stringify(searchData))
				window.location.href = `/${lang}/package-list`
		}
	}
}
