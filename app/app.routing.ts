import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TripSelectorFormComponent } from './component/tripselector/tripselector-form.component'
import { OrderTripComponent } from './component/order/order-trip.component'
import { OrderPackageComponent } from './component/order/order-package.component'
import { PackageListComponent } from './component/packagelist/packagelist.component'

import { UserPageComponent } from './component/user/user-page.component'

const appRoutes: Routes = [
	{
		path: 'en',
		component: TripSelectorFormComponent
	},
	{
		path: 'ar',
		component: TripSelectorFormComponent
	},
	{
		path: 'en/order',
		component: OrderTripComponent
	},
	{
		path: 'ar/order',
		component: OrderTripComponent
	},
	{
		path: 'en/order-package',
		component: OrderPackageComponent
	},
	{
		path: 'ar/order-package',
		component: OrderPackageComponent
	},
	{
		path: 'en/package-list',
		component: PackageListComponent
	},
	{
		path: 'ar/package-list',
		component: PackageListComponent
	},
	{
		path: 'en/user',
		component: UserPageComponent
	},
	{
		path: 'ar/user',
		component: UserPageComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
