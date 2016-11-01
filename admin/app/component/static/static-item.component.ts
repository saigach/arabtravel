import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import editorOptions from '../../editor.options'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { Static } from '../../model/static'

@Component({
	moduleId: module.id,
	selector: 'static-item',
	templateUrl: '/app/component/static/static-item.component.html'
})
export class StaticItemComponent implements OnInit {

	contentEditorOptions = Object.assign({}, editorOptions, {
		placeholderText: 'Page content'
	})

	item: Static = new Static()

	submitted: boolean = false

	get image(): string {
		return this.item.image || '/placeholder_200x100.svg'
	}

	get valid(): boolean {
		return this.item.title.length > 0 && this.item.url.length > 0 && /[a-z0-9\-]+/.test(this.item.url)
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
			this.apiService.get<Static>(Static, id)
				.then((response: Static) => this.item = response)
				.catch(error => this.item = null)


	}

	back(): void {
		this.location.back()
	}

	setImage(fileSelector: HTMLInputElement): void {
		if (fileSelector.files.length) {
			this.fileService.uploadImage(fileSelector.files[0]).then(response => this.item.image = response.link || '')
			fileSelector.value = null
		}
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		let ts: string = ''

		this.apiService.update<Static>(Static, this.item).then((response: Static) => this.back())
	}
}
