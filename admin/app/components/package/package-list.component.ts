import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Package } from '../../models/package'

@Component({
	moduleId: module.id,
	selector: 'package-list',
	templateUrl: '/app/components/package/package-list.component.html'
})
export class PackageListComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}

	add(): void {

	}
}
