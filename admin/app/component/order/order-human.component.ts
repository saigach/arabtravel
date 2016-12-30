import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'

import { str2Date, File } from '../../../../model/common'
import { Human, Nationality } from '../../../../model/human'
import { FileService } from '../../service/file.service'

@Component({
	moduleId: module.id,
	selector: 'order-human',
	templateUrl: '/app/component/order/order-human.component.html'
})
export class OrderHumanComponent implements OnInit {

	nationalityList = Nationality.List

	item: Human = new Human()

	@Output() humanChange = new EventEmitter()

	@Input()
	get human() {
		return this.item
	}

	set human(value: Human) {
		this.item = value
		this.humanChange.emit(this.item)
	}

	@ViewChild('dobNode') dobRef: ElementRef
	dobDatepicker: any = null

	constructor(private fileService: FileService) {}

	ngOnInit(): void {
		this.dobDatepicker = UIkit.datepicker(this.dobRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.dobDatepicker.on('hide.uk.datepicker', event =>
			this.item.dob = str2Date(event.target.value)
		)
	}

	addTicket(fileSelector: HTMLInputElement): void {
		if (fileSelector.files.length) {
			this.fileService.uploadPdf(fileSelector.files[0])
			.then(response => {
				if (!response.link)
					return
				response.title = 'New ticket'
				this.item.tickets.push(new File(response))
			})
			fileSelector.value = null
		}
	}

	deleteTicket(ticket: File): void {
		this.item.tickets = this.item.tickets.filter( value => value !== ticket)
	}
}

