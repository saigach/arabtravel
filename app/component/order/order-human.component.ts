import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { Human, Nationality } from '../../../model/human'
import { str2Date } from '../../../model/common'

@Component({
	moduleId: module.id,
	selector: 'order-human',
	templateUrl: '/app/component/order/order-human.component.html'
})
export class OrderHumanComponent implements OnInit {

	nationality = Nationality.List

	_item: Human = new Human()

	@Output() itemChange = new EventEmitter()

	@Input()
	get item() {
		return this._item
	}

	set item(value: Human) {
		this._item = value
		this.itemChange.emit(this._item)
	}

	@ViewChild('dobNode') dobRef: ElementRef
	dobDatepicker: any = null

	constructor() {}

	ngOnInit(): void {
		this.dobDatepicker = UIkit.datepicker(this.dobRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.dobDatepicker.on('hide.uk.datepicker', event =>
			this.item.dob = str2Date(event.target.value)
		)
	}
}

