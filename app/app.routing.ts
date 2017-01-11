import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TripSelectorFormComponent } from './component/tripselector/tripselector-form.component'
import { OrderPageComponent } from './component/order/order-page.component'
import { PackageListComponent } from './component/packagelist/packagelist.component'

import { UserPageComponent } from './component/user/user-page.component'

const appRoutes: Routes = [
	{
		path: '',
		component: TripSelectorFormComponent
	},
	{
		path: 'order',
		component: OrderPageComponent
	},
	{
		path: 'package-list',
		component: PackageListComponent
	},
	{
		path: 'user',
		component: UserPageComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
