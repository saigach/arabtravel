import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HotelListComponent } from './components/hotel/hotel-list.component'
import { HotelItemComponent } from './components/hotel/hotel-item.component'

import { OrderListComponent } from './components/order/order-list.component'
import { OrderItemComponent } from './components/order/order-item.component'

import { PackageListComponent } from './components/package/package-list.component'
import { PackageItemComponent } from './components/package/package-item.component'

import { TripListComponent } from './components/trip/trip-list.component'
import { TripItemComponent } from './components/trip/trip-item.component'

import { UserListComponent } from './components/user/user-list.component'
import { UserItemComponent } from './components/user/user-item.component'

import { SelfComponent } from './components/self/self.component'
import { SystemComponent } from './components/system/system.component'

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
