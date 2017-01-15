import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

import { MLString } from '../../../../model/common'

import editorOptions from '../../editor.options'

@Component({
	moduleId: module.id,
	selector: 'mleditor',
	templateUrl: '/app/component/mlinput/mleditor.component.html'
})
export class MLEditorComponent {

	contentEditorOptions = Object.assign({}, editorOptions, {
		placeholderText: 'Hyper text description'
	})

	Languages = MLString.Languages
	currentLanhuage: string = MLString.Languages[0]

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
}
