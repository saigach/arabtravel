import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

import { MLString } from '../../../../model/common'

@Component({
	moduleId: module.id,
	selector: 'mlinput',
	templateUrl: '/app/component/mlinput/mlinput.component.html'
})
export class MLInputComponent {

	Languages = MLString.Languages

	item: MLString = new MLString()

	@Output() valueChange = new EventEmitter()

	@Input()
	get value() {
		return this.item
	}

	set value(value: MLString) {
		this.item = new MLString(value)
		this.valueChange.emit(this.item)
	}

	_size: string = 'large'

	@Output() sizeChange = new EventEmitter()

	@Input()
	get size() {
		return this._size
	}

	set size(value: string) {
		this._size = value
		this.sizeChange.emit(this.size)
	}

	get class(): string {
		return `uk-form-width-${this._size}`
	}
}
