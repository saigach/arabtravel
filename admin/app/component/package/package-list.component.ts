import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Package } from '../../model/package'

@Component({
	moduleId: module.id,
	selector: 'package-list',
	templateUrl: '/app/component/package/package-list.component.html'
})
export class PackageListComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}

	add(): void {

	}
}
