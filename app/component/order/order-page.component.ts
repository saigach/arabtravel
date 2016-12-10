import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Order } from '../../../model/order'
import { Trip } from '../../../model/trip'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'
import { Human } from '../../../model/human'

type TripType = 'oneway' | 'round' | 'package'

@Component({
	moduleId: module.id,
	selector: 'order-page',
	templateUrl: '/app/component/order/order-page.component.html'
})
export class OrderPageComponent implements OnInit {

	order: Order = new Order()

	get ticketsCost(): number {
		return 0
	}

	get totalCost(): number {
		return 0
	}

	submitted: boolean = false

	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {

		let localStorageValue = localStorage.getItem('currentOrder')

		if (!localStorageValue) {
			window.location.href = '/'
			return
		}

		let currentOrder: {
			type: TripType,
			pointA: string,
			pointB: string,
			anyDate: boolean,
			departureDate: string,
			returnDate: string,
			vehicle: string,
			peopleCount: number
		} = null

		try {
			currentOrder = JSON.parse(localStorageValue)
		} catch(error) {
			window.location.href = '/'
			return
		}

		switch (currentOrder.type) {
			case 'oneway':
			case 'round':
				this.apiService.get<Trip>(Trip).then( ( trips:Trip[] ) => {

					const getTrip = (pointAId: string, pointBId: string): Trip =>
						trips.filter( (trip: Trip) =>
							trip.pointA.id.toString() === pointAId &&
							trip.pointB.id.toString() === pointBId
						).shift()

					const newDate = value => {
						let date = new Date(value)

						if ( !Number.isNaN( date.getTime() ) )
							return date

						return new Date()
					}

					let tripAB = getTrip(currentOrder.pointA, currentOrder.pointB)
					let dateAB = newDate(currentOrder.departureDate)

					this.order.shifts.push({
						date: dateAB,
						trip: tripAB,
						hotel: null,
						price: tripAB.getPrice(dateAB)
					})

					if (currentOrder.type = 'round') {
						let tripBA = getTrip(currentOrder.pointB, currentOrder.pointA)
						let dateBA = newDate(currentOrder.returnDate)
						this.order.shifts.push({
							date: dateBA,
							trip: tripBA,
							hotel: null,
							price: tripBA.getPrice(dateBA)
						})
					}

					for(let i = 0; i < currentOrder.peopleCount; i++)
						this.order.people.push(new Human())

				})
				return
			case 'package':
					console.log('!!!TODO')
				return
			default:
				window.location.href = '/'
				return
		}
	}

	addHuman(): void {
		this.order.people.push(new Human())
	}

	deleteHuman(human: Human): void {
		this.order.people = this.order.people.filter(value => value !== human)
	}
}

