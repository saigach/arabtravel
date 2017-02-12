import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CommonComponent } from './component/common/common.component'

import { OrderListComponent } from './component/order/order-list.component'
import { OrderItemComponent } from './component/order/order-item.component'

import { UserListComponent } from './component/user/user-list.component'
import { UserItemComponent } from './component/user/user-item.component'

import { PointListComponent } from './component/point/point-list.component'
import { VehicleListComponent } from './component/vehicle/vehicle-list.component'

import { HotelListComponent } from './component/hotel/hotel-list.component'
import { HotelItemComponent } from './component/hotel/hotel-item.component'

import { TripListComponent } from './component/trip/trip-list.component'
import { TripItemComponent } from './component/trip/trip-item.component'

import { PackageListComponent } from './component/package/package-list.component'
import { PackageItemComponent } from './component/package/package-item.component'

import { StaticListComponent } from './component/static/static-list.component'
import { StaticItemComponent } from './component/static/static-item.component'

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/orders',
		pathMatch: 'full'
	},
	{
		path: 'common',
		component: CommonComponent
	},
	{
		path: 'orders',
		component: OrderListComponent
	},
	{
		path: 'orders/:type/:id',
		component: OrderItemComponent
	},
	{
		path: 'users',
		component: UserListComponent
	},
	{
		path: 'users/:id',
		component: UserItemComponent
	},
	{
		path: 'points',
		component: PointListComponent
	},
	{
		path: 'vehicle',
		component: VehicleListComponent
	},
	{
		path: 'hotels',
		component: HotelListComponent
	},
	{
		path: 'hotels/:id',
		component: HotelItemComponent
	},
	{
		path: 'trips',
		component: TripListComponent
	},
	{
		path: 'trips/:id',
		component: TripItemComponent
	},
	{
		path: 'packages',
		component: PackageListComponent
	},
	{
		path: 'packages/:id',
		component: PackageItemComponent
	},
	{
		path: 'static',
		component: StaticListComponent
	},
	{
		path: 'static/:id',
		component: StaticItemComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
