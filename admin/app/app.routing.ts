import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HotelListComponent } from './component/hotel/hotel-list.component'
import { HotelItemComponent } from './component/hotel/hotel-item.component'

import { OrderListComponent } from './component/order/order-list.component'
import { OrderItemComponent } from './component/order/order-item.component'

import { PackageListComponent } from './component/package/package-list.component'
import { PackageItemComponent } from './component/package/package-item.component'

import { TripListComponent } from './component/trip/trip-list.component'
import { TripItemComponent } from './component/trip/trip-item.component'

import { UserListComponent } from './component/user/user-list.component'
import { UserItemComponent } from './component/user/user-item.component'

import { SelfComponent } from './component/self/self.component'
import { SystemComponent } from './component/system/system.component'

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/orders',
		pathMatch: 'full'
	},
	{
		path: 'orders',
		component: OrderListComponent
	},
	{
		path: 'orders/:id',
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
		path: 'hotels',
		component: HotelListComponent
	},
	{
		path: 'hotels/:id',
		component: HotelItemComponent
	},
	{
		path: 'system',
		component: SystemComponent
	},
	{
		path: 'self',
		component: SelfComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
