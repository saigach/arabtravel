import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Trip } from '../../../model/trip'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'
import { Package } from '../../../model/package'

type TripType = 'oneway' | 'round' | 'package'

@Component({
	moduleId: module.id,
	selector: 'tripselector-form',
	templateUrl: '/app/component/tripselector/tripselector-form.component.html'
})
export class TripSelectorFormComponent implements OnInit {
	trips: Trip[] = []
	packs: Package[] = []

	type: TripType = 'oneway'

	pointA: Point = null
	pointB: Point = null

	get APoints(): Point[] {
		if (this.type === 'package')
			return this.packs.reduce( (prev: Point[], pack: Package) => {
				if (!pack.pointA || !pack.pointB)
					return prev

				if ( prev.find( (point:Point) => point.id.toString() === pack.pointA.id.toString() ) )
					return prev

				return prev.concat(pack.pointA)
			}, [] )

		let APoints = this.trips.reduce( (prev: Point[], trip: Trip) => {
			if (!trip.pointA || !trip.pointB)
				return prev

			if ( prev.find( (point:Point) => point.id.toString() === trip.pointA.id.toString() ) )
				return prev

			return prev.concat(trip.pointA)
		}, [] )

		if (this.type === 'oneway')
			return APoints

		if (this.type === 'round')
			return APoints.filter( (point:Point) =>
				this.trips.find( (trip:Trip) =>
					trip.pointB.id.toString() === point.id.toString()
				)
			)

		return []
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		if (this.type === 'package')
			return this.packs.reduce( (prev: Point[], pack: Package) => {
				if (!pack.pointA || !pack.pointB)
					return prev

				if ( prev.find( (point:Point) => point.id.toString() === pack.pointB.id.toString() ) )
					return prev

				if (pack.pointA.id.toString() !== this.pointA.id.toString())
					return prev

				return prev.concat(pack.pointB)
			}, [] )

		let BPoints = this.trips.reduce( (prev: Point[], trip: Trip) => {
			if (!trip.pointA || !trip.pointB)
				return prev

			if ( prev.find( (point:Point) => point.id.toString() === trip.pointB.id.toString() ) )
				return prev

			if (trip.pointA.id.toString() !== this.pointA.id.toString())
				return prev

			return prev.concat(trip.pointB)
		}, [] )

		if (this.type === 'oneway')
			return BPoints

		if (this.type === 'round')
			return BPoints.filter( (point:Point) =>
				this.trips.find( (trip:Trip) =>
					trip.pointA.id.toString() === point.id.toString() &&
					trip.pointB.id.toString() === this.pointA.id.toString()
				)
			)

		return []
	}

	anyDate: boolean = false

	departureDate: Date = new Date()
	returnDate: Date = new Date()

	adults: number = 0
	kinds: number = 0
	infants: number = 0

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
		this.apiService.get<Package>(Package).then( ( packs:Package[] ) => this.packs = packs )
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		// let trip: Trip = this.oneWayTrip

		// localStorage.setItem('currentOrder', JSON.stringify({
		// 	trip: trip.id.toString(),
		// 	date: this.date,
		// 	peopleCount: (this.adults + this.kinds + this.infants) || 1
		// }))

		// window.location.href = "/order"
	}
}
