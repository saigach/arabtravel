import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { APIService } from '../../service/api.service'

import { Package } from '../../model/package'

@Component({
	moduleId: module.id,
	selector: 'package-item',
	templateUrl: '/app/component/package/package-item.component.html'
})
export class PackageItemComponent implements OnInit {
	constructor(private router: Router, private apiService: APIService) {}

	ngOnInit(): void {
	}
}
