import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { Human, Nationality } from '../../../model/human'

@Component({
	moduleId: module.id,
	selector: 'order-human',
	templateUrl: '/app/component/order/order-human.component.html'
})
export class OrderHumanComponent implements OnInit {

	nationality = Nationality

	__human: Human = new Human()

	@Output() humanChange = new EventEmitter()

	@Input()
	get human() {
		return this.__human
	}

	set human(value: Human) {
		this.__human = value
		this.humanChange.emit(this.__human)
	}

	@ViewChild('dobNode') dobRef: ElementRef
	dobDatepicker: any = null

	constructor() {}

	ngOnInit(): void {
		const newDate = value => {
			let [day, month, year] = value.split('.')
			let date = new Date(year, month, day)

			if ( !Number.isNaN( date.getTime() ) )
				return date

			return null
		}

		this.dobDatepicker = UIkit.datepicker(this.dobRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.dobDatepicker.on('hide.uk.datepicker', event =>
			this.human.dob = newDate(event.target.value)
		)
	}
}

