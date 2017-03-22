import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'

import { str2Date, File } from '../../../../model/common'
import { FileService } from '../../service/file.service'

import { Room, Cost} from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-price',
	templateUrl: '/app/component/hotel/hotel-price.component.html'
})
export class HotelPriceComponent implements OnInit {

	item: Room = new Room()

	@Output() roomChange = new EventEmitter()

	@Input()
	get room() {
		return this.item
	}

	set room(value: Room) {
		this.item = value
		this.roomChange.emit(this.room)
	}

	addColumn(row: Cost): void {
		row.ages.push({ min: 0, max: 999 })
		this.roomChange.emit(this.room)
	}

	deleteColumn(row: Cost): void {
		if (row.ages.length <= 1)
			row.ages = [{ min: 0, max: 999 }]
		else
			row.ages.pop()
		this.roomChange.emit(this.room)
	}

	addRow(): void {
		this.item.costs.push( new Cost() )
		this.roomChange.emit(this.room)
	}

	deleteRow(row: Cost): void {
		this.item.costs = this.item.costs.filter(value => value !== row)
		this.roomChange.emit(this.room)
	}

	constructor() {}

	ngOnInit(): void {

	}
}

