import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { str2Date, newDate, MLString, SearchData } from '../../../model/common'
import { PackageOrder } from '../../../model/package-order'
import { Package } from '../../../model/package'
import { Point } from '../../../model/point'
import { Human } from '../../../model/human'
import { Room, Hotel } from '../../../model/hotel'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

@Component({
	moduleId: module.id,
	selector: 'package-list',
	templateUrl: '/app/component/packagelist/packagelist.component.html'
})
export class PackageListComponent implements OnInit {

	packages: Package[] = []

	private _pointA: Point = null
	
	ratingsList: Array<number> = [1, 2, 3, 4, 5];
	
	rating: { value: number }[] = []

	get pointA(): Point {
		return this._pointA
	}

	set pointA(value: Point) {
		this._pointA = value
		this.pointB = null
	}

	pointB: Point = null

	get APoints(): Point[] {
		return this.packages.reduce(
			(prev: Point[], value: Package ) =>
				!prev.find( (prevValue: Point) => prevValue.id.equal(value.pointA.id) ) ?
					prev.concat(value.pointA) : prev,
			[]
		)
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		return this.packages.reduce(
			(prev: Point[], value: Package ) =>
				value.pointA && value.pointA.id.equal(this.pointA.id) &&
				!prev.find( (prevValue: Point) => prevValue.id.equal(value.pointB.id) ) ?
					prev.concat(value.pointB) : prev,
			[]
		)
	}

	get packageList(): Package[] {
		return this.packages.filter( (value: Package) =>
			(!this.pointA || value.pointA === this.pointA) &&
			(!this.pointB || value.pointB === this.pointB)
		)
	}

	anyDate: boolean = false

	@ViewChild('departureDateNode') departureDateRef: ElementRef
	departureDateDatepicker: any = null
	departureDate: Date = new Date()

	ml: { [key:string]: MLString } = {}

	kidsAges: { value: number }[] = []

	adults: number = 1
	kids: number = 0

	resetKidsAges(): void {
		this.kidsAges = Array.apply(null, {length: this.kids}).map( () => ({ value: 0}) )
	}

	get ageList(): number[] {
		let result = []

		for (let i = 0; i < this.adults; i++)
			result.push(999)

		for (let i = 0; i < this.kidsAges.length; i++)
			result.push(this.kidsAges[i].value)

		return result
	}

	constructor(private router: Router, private apiService: APIService, private mlService: MLService) {}

	ngOnInit(): void {
		this.mlService.get().then( ml => this.ml = ml)

		let searchData: SearchData = null

		try {
			searchData = JSON.parse(localStorage.getItem('searchData'))
		} catch(error) {
			searchData = null
		}

		localStorage.removeItem('searchData')

		this.apiService.get<Package>(Package).then( (response: Package[]) => {
			this.packages = response.filter( (value: Package) => !!value.hotel )

			if (searchData) {
				this.anyDate = !!searchData.anyDate

				let date = newDate(searchData.departureDate || null) || new Date()
				this.departureDate = date

				let pointAuuid = searchData.pointA.trim().toLowerCase()

				if (pointAuuid) {
					this.pointA = this.APoints.find( (value:Point) => value.id.uuid === pointAuuid )

					let pointBuuid = searchData.pointB.trim().toLowerCase()

					if (pointBuuid)
						this.pointB = this.BPoints.find( (value:Point) => value.id.uuid === pointBuuid )
				}

				this.adults = searchData.adults || 0

				this.kidsAges = searchData.kidsAges || []

				this.kids = this.kidsAges.length
			}
		})

		this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
			weekstart: 1,
			format:'DD.MM.YYYY'
		})

		this.departureDateDatepicker.on('hide.uk.datepicker', event =>
			this.departureDate = str2Date(event.target.value)
		)
	}

	select(pack: Package): void {
		let order = new PackageOrder({
			package: pack,
			peopleInRoom: [],
			departureDate: this.departureDate,
			anyDate: this.anyDate
		})

		localStorage.setItem('currentOrder', order.toString())
		window.location.href = `/${lang}/order-package`
	}
}
