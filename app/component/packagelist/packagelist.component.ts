import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'
import { MLService } from '../../service/ml.service'

import { str2Date, SearchData, newDate, MLString } from '../../../model/common'
import { PackageOrder } from '../../../model/package-order'
import { Package } from '../../../model/package'
import { Point } from '../../../model/point'
import { PeopleCount } from '../../../model/order'
import { Human, AgeGroup } from '../../../model/human'
import { Room } from '../../../model/hotel'

const lang = document.querySelector('html').getAttribute('lang') || 'en'

@Component({
	moduleId: module.id,
	selector: 'package-list',
	templateUrl: '/app/component/packagelist/packagelist.component.html'
})
export class PackageListComponent implements OnInit {

	packages: Package[] = []

	private _pointA: Point = null

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
				prev.concat(value.pointA),
			[]
		)
	}

	get BPoints(): Point[] {
		if (!this.pointA)
			return []

		return this.packages.reduce(
			(prev: Point[], value: Package ) =>
				value.pointA === this.pointA ? prev.concat(value.pointB) : prev,
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

	peopleCount: PeopleCount[] = AgeGroup.List.reduce(
		( prev:PeopleCount[], value:AgeGroup ) =>
			prev.concat({
				ageGroup: value,
				count: value.id === 'adults' ? 1 : 0
			}),
		[]
	)

	ml: { [key:string]: MLString } = {}

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
			this.packages = response

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

				if (searchData.peopleCount instanceof Array)
					this.peopleCount.forEach( (peopleCount:PeopleCount) => {
						let pc = searchData.peopleCount.find(
							(value:{ ageGroup: string, count: number }) => value.ageGroup === peopleCount.ageGroup.id
						)
						if (pc)
							peopleCount.count = pc.count || peopleCount.count
					})
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
			people: this.peopleCount.reduce(
				(prev: Human[], value:PeopleCount) => {
					for(let i = 0; i < value.count; i++)
						prev.push(new Human({ defaultAgeGroup: value.ageGroup }))
					return prev
				},
				[]
			),
			departureDate: this.departureDate,
			anyDate: this.anyDate,
			price: pack.getPrice(this.anyDate ? undefined : this.departureDate),
			hotel: pack.firstHotel,
			room: pack.firstHotel ? pack.firstHotel.rooms.reduce(
				(prev:Room, value:Room) => prev === null || value.cost <= prev.cost ? value : prev,
				null
			) : null
		})

		localStorage.setItem('currentPackageOrder', order.toString())
		window.location.href = `/${lang}/order-package`
	}
}
