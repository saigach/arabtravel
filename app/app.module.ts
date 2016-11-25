import './rxjs-extensions'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { routing } from './app.routing'

import { APIService } from './service/api.service'
import { AppComponent } from './component/app.component'

import { TripSelectorFormComponent } from './component/tripselector/tripselector-form.component'

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,
		TripSelectorFormComponent
	],
	providers: [
		APIService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
