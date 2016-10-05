import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../services/api.service'

import { Package } from '../../models/package'

@Component({
	moduleId: module.id,
	selector: 'package-item',
	templateUrl: '/app/components/package/package-item.component.html'
})
export class PackageItemComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
