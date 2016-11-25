import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TripSelectorFormComponent } from './component/tripselector/tripselector-form.component'

const appRoutes: Routes = [
	{
		path: '',
		component: TripSelectorFormComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
