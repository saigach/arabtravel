import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'

import { Price } from '../../../../model/price'

const str2Date = str => {
	let [dd, mm, yyyy] = str.split(/[^0-9]+/)
	let date = new Date(`${yyyy}-${mm}-${dd}`)
	if ( !Number.isNaN( date.getTime() ) )
		return date
	return new Date()
}

@Component({
	moduleId: module.id,
	selector: 'price-list',
	templateUrl: '/app/component/price/price-list.component.html'
})
export class PriceListComponent implements OnInit {

	__items: Price[] = []

	@Output() itemsChange = new EventEmitter()

	@Input()
	get items() {
		return this.__items
	}

	set items(value) {
		this.__items = value
		this.itemsChange.emit(this.__items)
	}

	item: Price = new Price()

	@ViewChild('priceEditor') priceEditorRef: ElementRef
	priceEditor: any = null

	@ViewChild('startDate') startDateRef: ElementRef
	startDate: any = null

	@ViewChild('endDate') endDateRef: ElementRef
	endDate: any = null

	submitted: boolean = false

	get valid(): boolean {
		return this.item.title.length > 0
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService
				) {}

	ngOnInit(): void {
		this.startDate = this.startDateRef.nativeElement
		this.endDate = this.endDateRef.nativeElement

		this.priceEditor = UIkit.modal(this.priceEditorRef.nativeElement)
		this.priceEditor.on('hide.uk.modal', event => {
			this.item.startDate = str2Date(this.startDate.value)
			this.item.endDate = str2Date(this.endDate.value)
		})
	}

	add(): void {
		this.item = new Price()
		this.items.push(this.item)
		this.priceEditor.show()
	}

	delete(price: Price): void {
		this.items = this.items.filter(value => value !== price)
	}

	edit(price: Price): void {
		this.item = price
		this.priceEditor.show()
	}

	addRefund(): void {
		this.item.refund.push({interval: 30, percent: 0})
	}
}

