import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { MLService } from '../../service/ml.service'

import { MLString } from '../../../model/common'
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

	ml: { [key:string]: MLString } = {}

	constructor(private mlService: MLService) {}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)

		this.dobDatepicker = UIkit.datepicker(this.dobRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.dobDatepicker.on('hide.uk.datepicker', event =>
			this.item.dob = str2Date(event.target.value)
		)
	}
}

