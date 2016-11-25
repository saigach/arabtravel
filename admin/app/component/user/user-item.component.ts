import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { APIService } from '../../service/api.service'
import { FileService } from '../../service/file.service'

import { User, UserRoles } from '../../../../model/user'

@Component({
	moduleId: module.id,
	selector: 'user-item',
	templateUrl: '/app/component/user/user-item.component.html'
})
export class UserItemComponent implements OnInit {

	userRoles = UserRoles

	item: User = new User()

	submitted: boolean = false

	get image(): string {
		return this.item.image || '/placeholder_200x100.svg'
	}

	get valid(): boolean {
		return this.item.title.length > 0 && this.item.email.length > 0
	}

	@ViewChild('passwordDialog') passwordDialogRef: ElementRef
	passwordDialog: any = null

	constructor(private route: ActivatedRoute,
				private location: Location,
				private apiService: APIService,
				private fileService: FileService
				) {}

	ngOnInit(): void {
		let id: string = this.route.snapshot.params['id'] || null
		if (!id)
			return

		this.passwordDialog = UIkit.modal(this.passwordDialogRef.nativeElement)

		if (id.toLowerCase() !== 'new')
			this.apiService.get<User>(User, id)
				.then((response: User) => this.item = response)
				.catch(error => this.item = null)
	}

	back(): void {
		this.location.back()
	}

	isRole(role): boolean {
		return !!this.item.roles.find(value => value.id === role.id)
	}

	toggleRole(role): void {
		if (this.isRole(role))
			this.item.roles = this.item.roles.filter(value => value.id !== role.id)
		else
			this.item.roles.push(role)
	}

	setImage(fileSelector: HTMLInputElement): void {
		if (fileSelector.files.length) {
			this.fileService.uploadImage(fileSelector.files[0]).then(response => this.item.image = response.link || '')
			fileSelector.value = null
		}
	}

	password1: string = ''
	password2: string = ''

	showPasswordDialog(event: Event) {
		event.preventDefault()
		this.password1 = ''
		this.password2 = ''
		this.passwordDialog.show()
	}

	get validPassword(): boolean {
		return this.password1 === this.password2 && this.password1.length > 7
	}

	setPassword(): void {
		this.apiService.command<User>(User, this.item, 'password', { id: this.item.id.toString(), password: this.password1 }).then((response: any) => {
			UIkit.notify(`<i class='uk-icon-check'></i>&emsp;Password changed`)
			this.passwordDialog.hide()
		})
	}

	submit(): void {
		if (this.submitted)
			return
		this.submitted = true

		this.apiService.update<User>(User, this.item).then((response: User) => this.back())
	}
}
