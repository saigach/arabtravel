import './rxjs-extensions'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { routing } from './app.routing'

import { APIService } from './service/api.service'
import { FileService } from './service/file.service'

import { ListFilterPipe } from './pipe/list-filter.pipe'
import { ListOrderBy } from './pipe/list-orderby.pipe'

import { FroalaEditorDirective, FroalaViewDirective } from './directive/froala.directives'

import { AppComponent } from './component/app.component'

import { CommonComponent } from './component/common/common.component'

import { OrderListComponent } from './component/order/order-list.component'
import { OrderItemComponent } from './component/order/order-item.component'
import { OrderHumanComponent } from './component/order/order-human.component'
import { OrderShiftComponent } from './component/order/order-shift.component'

import { UserListComponent } from './component/user/user-list.component'
import { UserItemComponent } from './component/user/user-item.component'

import { PointListComponent } from './component/point/point-list.component'
import { VehicleListComponent } from './component/vehicle/vehicle-list.component'

import { HotelListComponent } from './component/hotel/hotel-list.component'
import { HotelItemComponent } from './component/hotel/hotel-item.component'
import { HotelSelectorComponent } from './component/hotel/hotel-selector.component'

import { TripListComponent } from './component/trip/trip-list.component'
import { TripItemComponent } from './component/trip/trip-item.component'
import { TripPriceComponent } from './component/trip/trip-price.component'

import { StaticListComponent } from './component/static/static-list.component'
import { StaticItemComponent } from './component/static/static-item.component'

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,

		ListFilterPipe,
		ListOrderBy,

		FroalaEditorDirective,
		FroalaViewDirective,

		CommonComponent,

		OrderListComponent,
		OrderItemComponent,
		OrderHumanComponent,
		OrderShiftComponent,

		UserListComponent,
		UserItemComponent,

		PointListComponent,
		VehicleListComponent,

		HotelListComponent,
		HotelItemComponent,
		HotelSelectorComponent,

		TripListComponent,
		TripItemComponent,
		TripPriceComponent,

		StaticListComponent,
		StaticItemComponent
	],
	providers: [
		APIService,
		FileService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
