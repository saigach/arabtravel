import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

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

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/main',
		pathMatch: 'full'
	},
	{
		path: 'main',
		component: MainComponent
	},
	{
		path: 'news',
		component: NewsListComponent
	},
	{
		path: 'news/:id',
		component: NewsItemComponent
	},
	{
		path: 'static',
		component: StaticListComponent
	},
	{
		path: 'static/:id',
		component: StaticItemComponent
	},
	{
		path: 'projects',
		component: ProjectListComponent
	},
	{
		path: 'projects/:id',
		component: ProjectItemComponent
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
		path: 'volunteers',
		component: VolunteerListComponent
	},
	{
		path: 'volunteers/:id',
		component: VolunteerItemComponent
	},
	{
		path: 'messages',
		component: MessageComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
