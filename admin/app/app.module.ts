import './rxjs-extensions'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { APIService } from './services/api.service'
import { routing } from './app.routing'

import { AppComponent } from './components/app.component'

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
