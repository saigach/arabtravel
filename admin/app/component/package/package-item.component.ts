import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Package } from '../../model/package'

@Component({
	moduleId: module.id,
	selector: 'project-item',
	templateUrl: '/app/component/package/package-item.component.html'
})
export class OrderItemComponent implements OnInit {

	item: Package = new Package()

	submitted: boolean = false

	get valid(): boolean {
		return this.item.title.length > 0
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
			this.apiService.get<Package>(Package, id)
				.then((response: Package) => this.item = response)
				.catch(error => this.item = null)


	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Package>(Package, this.item).then((response: Package) => this.back())
	}
}

