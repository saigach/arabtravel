import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import editorOptions from '../../editor.options'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { File } from '../../../../model/common'
import { Trip, Price } from '../../../../model/trip'
import { Point } from '../../../../model/point'
import { Hotel } from '../../../../model/hotel'

@Component({
	moduleId: module.id,
	selector: 'trip-item',
	templateUrl: '/app/component/trip/trip-item.component.html'
})
export class TripItemComponent implements OnInit {

	contentEditorOptions = Object.assign({}, editorOptions, {
		placeholderText: 'Package description content'
	})

	points: Point[] = []
	hotels: Hotel[] = []

	item: Trip = new Trip()

	submitted: boolean = false

	get valid(): boolean {
		return  this.item.title.trim().length > 0 &&
				this.item.pointA &&
				this.item.pointB &&
				this.item.prices.length > 0
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

		Promise.all([
			this.apiService.get<Point>(Point).then( (response: Point[]) => this.points = response ),
			this.apiService.get<Hotel>(Hotel).then( (response: Hotel[]) => this.hotels = response )
		]).then( () => {
			if (id.toLowerCase() !== 'new')
				this.apiService.get<Trip>(Trip, id)
					.then((response: Trip) => {
						this.item = response
						this.item.pointA = this.item.pointA
										&& this.points.find(value => value.id.uuid === this.item.pointA.id.uuid)
										|| null
						this.item.pointB = this.item.pointB
										&& this.points.find(value => value.id.uuid === this.item.pointB.id.uuid)
										|| null

						this.item.hotels = this.item.hotels.map(
							(hotel: Hotel) => this.hotels.find( value => value.id.uuid === hotel.id.uuid ) || null
						).filter( (value: Hotel) => value && value.enable )

						for (let i = 0; i < this.item.hotels.length; ++i)
							 this.apiService.get<Hotel>(Hotel, this.item.hotels[i]).then(
							 		(response: Hotel) => this.item.hotels[i] = response
							 )
					})
					.catch(error => this.item = null)
		})
	}

	addHotel(): void {
		this.item.hotels.push(null)
	}

	deleteHotel(hotel: Hotel): void {
		this.item.hotels = this.item.hotels.filter(value => value !== hotel)
	}

	hotelChange(i: number): void {
		this.apiService.get<Hotel>(Hotel, this.item.hotels[i]).then( (response: Hotel) => this.item.hotels[i] = response)
	}

	addPrice(): void {
		this.item.prices.push(new Price())
	}

	deletePrice(price: Price): void {
		this.item.prices = this.item.prices.filter(value => value !== price)
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

		this.apiService.update<Trip>(Trip, this.item).then((response: Trip) => this.back())
	}
}

