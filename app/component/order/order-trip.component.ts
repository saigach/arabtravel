import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { MLString, str2Date } from '../../../model/common'
import { PaymentType } from '../../../model/order'
import { TripOrder } from '../../../model/trip-order'
import { Human } from '../../../model/human'
import { Trip, TripType } from '../../../model/trip'
import { Point } from '../../../model/point'
import { Vehicle } from '../../../model/vehicle'
import { Cost } from '../../../model/price'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

@Component({
	moduleId: module.id,
	selector: 'order-trip',
	templateUrl: '/app/component/order/order-trip.component.html'
})
export class OrderTripComponent implements OnInit {

	tripType: TripType = TripType.List[0]

	checkType(tripTypeId: 'oneway' | 'twoway'): boolean {
		return this.tripType === TripType.getTripType(tripTypeId)
	}

	setType(tripTypeId: 'oneway' | 'twoway'): void {
		this.tripType = TripType.getTripType(tripTypeId)
		this.pointA = null
		this.item.trip = null
	}

	trips: Trip[] = []

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null

	@ViewChild('returnDateNode') returnDateRef: ElementRef
	returnDateDatepicker: any = null

	months: number[] = [1,2,3,4,5,6,7,8,9,10]
	years: number[] = []

	paymentTypes: PaymentType[] = PaymentType.List

	item: TripOrder = new TripOrder()

	primaryContact: Human =  null

	submitting: boolean = false
	submitted: boolean = false

	ml: { [key:string]: MLString } = {}

	_currency: string = 'USD'

	get currency():string {
		return (this.ml && this._currency in this.ml) ? this.ml[this._currency][lang] : this._currency
	}

	set currency(value: string) {
		this._currency = value ? value : 'USD'
	}

	get exchangeRate(): number {
		if (this._currency === 'JOD')
			return 1
		if (this._currency === 'SAR')
			return this.item && this.item.exchangeRateSAR || 0
		if (this._currency === 'EGP')
			return this.item && this.item.exchangeRateEGP || 0
		return this.item && this.item.exchangeRate || 0
	}

	constructor(private router: Router, private apiService: APIService, private mlService: MLService, private ref: ChangeDetectorRef) {

		this.currency = localStorage && localStorage.getItem('currency') || null

		let thisYear = (new Date()).getFullYear()
		for (let i = thisYear; i <= thisYear + 10; i++)
			this.years.push(i)

		let currentOrderObj: {} = null

		try {
			currentOrderObj = JSON.parse(localStorage.getItem('currentOrder'))
		} catch(error) {
			currentOrderObj = null
		}

		if (!currentOrderObj)
			window.location.href = '/' + lang
		else {
			this.item =  new TripOrder(currentOrderObj)
			this.tripType = this.item.trip.type
		}
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
		this.item.vehicle = null

		if (this.pointA && this.pointB)
			this.item.trip = this.trips.find( (value: Trip) =>
				value.type === this.tripType &&
				value.pointA.id.equal(this.pointA.id) &&
				value.pointB.id.equal(this.pointB.id)
			) || null
	}

	get APoints(): Point[] {
		return this.trips.reduce(
			(prev: Point[], value: Trip ) =>
				value.type === this.tripType &&
				!prev.find( (prevValue: Point) => prevValue.id.equal(value.pointA.id) ) ?
					prev.concat(value.pointA) : prev,
			this.item.trip ? [this.item.trip.pointA] : []
		)
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		return this.trips.reduce(
			(prev: Point[], value: Trip ) =>
				value.type === this.tripType && value.pointA &&
				value.pointA.id.equal(this.pointA.id) ? prev.concat(value.pointB) : prev,
			this.item.trip ? [this.item.trip.pointB] : []
		)
	}

	get vehicleList(): Vehicle[] {
		if (!this.item.trip)
			return []

		let price = this.item.trip.getPrice(this.item.departureDate || null)

		return price.costs.reduce( (prev: Vehicle[], value: Cost) =>
			value.key instanceof Vehicle ? prev.concat(value.key) : prev,
			[]
		)
	}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)

		this.primaryContact = this.item.people.length > 0 ? this.item.people[0] : null

		this.apiService.config().then((response: {
			processingFee: number,
			exchangeRate: number,
			exchangeRateSAR: number,
			exchangeRateEGP: number,
			egyptianMarkUp: number
		}) => {
			this.item.processingFee = response.processingFee
			this.item.exchangeRate = response.exchangeRate
			this.item.exchangeRateSAR = response.exchangeRateSAR
			this.item.exchangeRateEGP = response.exchangeRateEGP
			this.item.egyptianMarkUp = response.egyptianMarkUp
		})

		this.apiService.get<Trip>(Trip).then( (response: Trip[]) => {
			this.trips = response

			if (this.item.trip) {
				this._pointA = this.item.trip.pointA
				this._pointB = this.item.trip.pointB
			}
		})

		UIkit.sticky('#order-details', {boundary: '#sticky-boundary'});

		Array.prototype.forEach.call(
			document.querySelectorAll('[currency-set]'),
			currencySetNode => currencySetNode.addEventListener('click', event =>{
				event.preventDefault()
				this.currency = currencySetNode.getAttribute('currency-set') || null
			})
		)

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event =>
			this.item.departureDate = str2Date(event.target.value)
		)

		this.returnDateDatepicker.on('hide.uk.datepicker', event =>
			this.item.returnDate = str2Date(event.target.value)
		)
	}

	addHuman(): void {
		this.item.people.push(new Human())
		if (this.item.people.length === 1)
			this.primaryContact = this.item.people[0]
	}

	deleteHuman(human: Human): void {
		this.item.people = this.item.people.filter(value => value !== human)
		if (!this.item.people.includes(this.primaryContact))
			this.primaryContact = this.item.people.length > 0 ? this.item.people[0] : null
	}

	submit(): void {
		if (this.submitting)
			return
		this.submitting = true

		this.apiService.order(this.item, this.primaryContact).then( value => {
			this.item = new TripOrder(value)
			UIkit.notify('Order sucess', {status  : 'success' })
			this.submitted = true
			localStorage.removeItem('currentOrder')
			this.submitting = false
		}).catch( error => {
			if (error.code && error.code === 401) {

				let loginForm: any = document.querySelector('#login-form-modal form')
				loginForm.elements.email.value = this.primaryContact && this.primaryContact.email

				UIkit.modal('#login-form-modal').show()
				this.submitting = false
				return
			}

			UIkit.notify('Server error', {status  : 'warning' })
			this.submitting = false
		})
	}
}
