import './rxjs-extensions'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { APIService } from './service/api.service'
import { routing } from './app.routing'

import { AppComponent } from './component/app.component'

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

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,
		HotelListComponent,
		HotelItemComponent,
		OrderListComponent,
		OrderItemComponent,
		PackageListComponent,
		PackageItemComponent,
		TripListComponent,
		TripItemComponent,
		UserListComponent,
		UserItemComponent,
		SelfComponent,
		SystemComponent
	],
	providers: [
		APIService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
