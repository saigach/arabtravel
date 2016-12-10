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

import { PriceListComponent } from './component/price/price-list.component'

import { PointListComponent } from './component/point/point-list.component'
import { VehicleListComponent } from './component/vehicle/vehicle-list.component'

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

		PriceListComponent,
		PointListComponent,
		VehicleListComponent,

		HotelListComponent,
		HotelItemComponent,

		HumanListComponent,
		HumanItemComponent,

		OrderListComponent,
		OrderItemComponent,

		TripListComponent,
		TripItemComponent,

		UserListComponent,
		UserItemComponent,

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
