import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { File, MLString } from '../../../../model/common'
import { Hotel, Room } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'hotel-item',
	templateUrl: '/app/component/hotel/hotel-item.component.html'
})
export class HotelItemComponent implements OnInit {

	item: Hotel = new Hotel()

	submitted: boolean = false

	get valid(): boolean {
		return MLString.checkValid(this.item.title)
			&& this.item.rooms.length > 0
	}

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {}

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'] || null
		if (!id)
			return

		if (id.toLowerCase() !== 'new')
			this.apiService.get<Hotel>(Hotel, id)
				.then((response: Hotel) => this.item = response)
				.catch(error => this.item = null)


	}

	addRoom(): void {
		this.item.rooms.push(new Room())
	}

	deleteRoom(room: Room): void {
		this.item.rooms = this.item.rooms.filter(value => value !== room)
	}

	setRoomImage(fileSelector: HTMLInputElement, room: Room): void {
		if (fileSelector.files.length) {
			this.fileService.uploadImage(fileSelector.files[0])
							.then(response => room.image = response.link && new File(response) || null)
			fileSelector.value = null
		}
	}

	addColumn(room: Room): void {
		room.costs = room.costs.map( value => value.concat(Array(1)).map( value => value === undefined ? null : value) )
	}

	addRow(room: Room): void {
		room.costs.push( Array(room.costs[0].length).map( value => value === undefined ? null : value) )
	}

	deleteRow(room: Room, i: number): void {
		room.costs.splice(i, 1)
	}

	deleteColumn(room: Room, i: number): void {
		room.costs = room.costs.map( value => {
			value.splice(i, 1)
			return value
		})
	}

	addImage(fileSelector: HTMLInputElement): void {
		if (fileSelector.files.length) {
			this.fileService.uploadImage(fileSelector.files[0])
							.then(response => response.link && this.item.images.push(new File(response)))
			fileSelector.value = null
		}
	}

	deleteImage(image: File): void {
		this.item.images = this.item.images.filter( value => value !== image)
	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Hotel>(Hotel, this.item).then((response: Hotel) => this.back())
	}
}

