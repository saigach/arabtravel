import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Human } from '../../model/human'

@Component({
	moduleId: module.id,
	selector: 'project-item',
	templateUrl: '/app/component/human/human-item.component.html'
})
export class HumanItemComponent implements OnInit {

	item: Human = new Human()

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
			this.apiService.get<Human>(Human, id)
				.then((response: Human) => this.item = response)
				.catch(error => this.item = null)


	}

	back(): void {
		this.location.back()
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<Human>(Human, this.item).then((response: Human) => this.back())
	}
}

