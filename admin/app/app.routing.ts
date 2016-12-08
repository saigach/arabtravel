import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HotelListComponent } from './component/hotel/hotel-list.component'
import { HotelItemComponent } from './component/hotel/hotel-item.component'

import { HumanListComponent } from './component/human/human-list.component'
import { HumanItemComponent } from './component/human/human-item.component'

import { OrderListComponent } from './component/order/order-list.component'
import { OrderItemComponent } from './component/order/order-item.component'

import { TripListComponent } from './component/trip/trip-list.component'
import { TripItemComponent } from './component/trip/trip-item.component'

import { UserListComponent } from './component/user/user-list.component'
import { UserItemComponent } from './component/user/user-item.component'

import { StaticListComponent } from './component/static/static-list.component'
import { StaticItemComponent } from './component/static/static-item.component'

import { PointListComponent } from './component/point/point-list.component'

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/orders',
		pathMatch: 'full'
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
		path: 'orders',
		component: OrderListComponent
	},
	{
		path: 'orders/:id',
		component: OrderItemComponent
	},
	{
		path: 'points',
		component: PointListComponent
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
		path: 'users',
		component: UserListComponent
	},
	{
		path: 'users/:id',
		component: UserItemComponent
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
