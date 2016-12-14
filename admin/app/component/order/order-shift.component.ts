import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { APIService } from '../../service/api.service'

import { Shift } from '../../../../model/shift'
import { Point } from '../../../../model/point'

@Component({
	moduleId: module.id,
	selector: 'order-shift',
	templateUrl: '/app/component/order/order-shift.component.html'
})
export class OrderShiftComponent implements OnInit {

	points: Point[] = []

	__shift: Shift = new Shift()

	@Output() shiftChange = new EventEmitter()

	@Input()
	get shift() {
		return this.__shift
	}

	set shift(value: Shift) {
		this.__shift = value
		this.shiftChange.emit(this.__shift)
	}

	@ViewChild('dateNode') dateRef: ElementRef
	dateDatepicker: any = null

	constructor(private apiService: APIService) {}

	ngOnInit(): void {
		this.apiService.get<Point>(Point).then( (response: Point[]) => this.points = response)

		const newDate = value => {
			let [day, month, year] = value.split('.')
			let date = new Date(year, month, day)

			if ( !Number.isNaN( date.getTime() ) )
				return date

			return new Date()
		}

		this.dateDatepicker = UIkit.datepicker(this.dateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.dateDatepicker.on('hide.uk.datepicker', event =>
			this.__shift.date = newDate(event.target.value)
		)
	}

	setTour(): void {

	}

	setPrice(): void {

	}

	setHotel(): void {

	}
}

