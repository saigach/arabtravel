import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { str2Date, SearchData, MLString } from '../../../model/common'
import { Trip } from '../../../model/trip'
import { VehicleCost} from '../../../model/price'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'
import { Human, AgeGroup } from '../../../model/human'
import { Order } from '../../../model/order'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

type TripType = 'oneway' | 'round' | 'package'
type PeopleCount = { ageGroup: AgeGroup, count: number }

@Component({
	moduleId: module.id,
	selector: 'tripselector-form',
	templateUrl: '/app/component/tripselector/tripselector-form.component.html'
})
export class TripSelectorFormComponent implements OnInit {

	private _type: TripType = 'oneway'

	get type(): TripType {
		return this._type
	}

	set type(value: TripType) {
		this._type = value
		this.pointA = null
		this.pointB = null
	}

	points: Point[] = []
	trips: Trip[] = []

	private getTrips(pointA: Point = null, pointB: Point = null, isPackage: boolean = false): Trip[] {
		return this.trips.filter( (trip: Trip) =>
			// trip.package === isPackage &&
			(!pointA || trip.pointA.id.uuid === pointA.id.uuid) &&
			(!pointB || trip.pointB.id.uuid === pointB.id.uuid)
		)
	}

	private _pointA: Point = null

	get pointA(): Point {
		return this._pointA
	}

	set pointA(value: Point) {
		this._pointA = value
		this.pointB = null
		this.vehicle = null
	}

	private _pointB: Point = null

	get pointB(): Point {
		return this._pointB
	}

	set pointB(value: Point) {
		this._pointB = value
		this.vehicle = null
	}

	private getPoints(type: 'A' | 'B', otherPoint: Point, isPackage: boolean = false): Point[] {
		let points = this.getTrips(null, null, isPackage).reduce( (prev: Point[], trip: Trip) => {
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
				return this.getPoints('A', null, true)
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
				return this.getPoints('B', null, true)
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

	peopleCount: PeopleCount[] = AgeGroup.List.reduce(
		( prev:PeopleCount[], value:AgeGroup ) =>
			prev.concat({
				ageGroup: value,
				count: value.id === 'adults' ? 1 : 0
			}),
		[]
	)

	get vehicleList(): Vehicle[] {
		let trip = this.getTrips(this.pointA, this.pointB).shift()

		if (!trip)
			return []

		let price = trip.getPrice(this.departureDate || null)

		return price.vehicles.reduce( (prev: Vehicle[], value:VehicleCost) =>
			value.enable ? prev.concat(value.vehicle) : prev,
			[]
		)
	}

	vehicle: Vehicle = null

	submitted: boolean = false

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

		this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.returnDateDatepicker.on('hide.uk.datepicker', event =>
			this.returnDate = str2Date(event.target.value)
		)
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		if (this.type !== 'package') {
			let order = new Order()
			// order.package = false

			let AB = this.getTrips(this.pointA, this.pointB).shift()
			if (AB) {
				// order.shifts.push(new Shift({
				// 	date: this.departureDate,
				// 	trip: AB,
				// 	price: AB.getPrice(this.departureDate),
				// 	vehicle: this.vehicle
				// }))
			}

			if (this.type === 'round') {
				let BA = this.getTrips(this.pointB, this.pointA).shift()
				if (BA) {
					// order.shifts.push(new Shift({
					// 	date: this.returnDate,
					// 	trip: BA,
					// 	price: BA.getPrice(this.returnDate),
					// 	vehicle: this.vehicle
					// }))
				}
			}

			order.people = this.peopleCount.reduce(
				(prev: Human[], value:PeopleCount) => {
					for(let i = 0; i < value.count; i++)
						prev.push(new Human({ defaultAgeGroup: value.ageGroup }))
					return prev
				},
				[]
			)

			localStorage.setItem('currentOrder', order.toString())
			window.location.href = `/${lang}/order`
			return
		}

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
