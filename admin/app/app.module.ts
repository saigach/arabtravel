import './rxjs-extensions'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule }    from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { APIService } from './service/api.service'
import { FileService } from './service/file.service'
import { routing } from './app.routing'

import { AppComponent } from './component/app.component'

import { FroalaEditorDirective, FroalaViewDirective } from './directive/froala.directives'

import { StaticListComponent } from './component/static/static-list.component'
import { StaticItemComponent } from './component/static/static-item.component'

import { NewsListComponent } from './component/news/news-list.component'
import { NewsItemComponent } from './component/news/news-item.component'

import { ProjectListComponent } from './component/project/project-list.component'
import { ProjectItemComponent } from './component/project/project-item.component'

import { UserListComponent } from './component/user/user-list.component'
import { UserItemComponent } from './component/user/user-item.component'

import { VolunteerListComponent } from './component/volunteer/volunteer-list.component'
import { VolunteerItemComponent } from './component/volunteer/volunteer-item.component'

import { MessageComponent } from './component/message/message.component'

import { MainComponent } from './component/main/main.component'

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,
		FroalaEditorDirective,
		FroalaViewDirective,
		StaticListComponent,
		StaticItemComponent,
		NewsListComponent,
		NewsItemComponent,
		ProjectListComponent,
		ProjectItemComponent,
		UserListComponent,
		UserItemComponent,
		VolunteerListComponent,
		VolunteerItemComponent,
		MessageComponent,
		MainComponent
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
