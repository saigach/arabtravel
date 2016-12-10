import { ModuleWithProviders }  from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TripSelectorFormComponent } from './component/tripselector/tripselector-form.component'
import { OrderPageComponent } from './component/order/order-page.component'

const appRoutes: Routes = [
	{
		path: '',
		component: TripSelectorFormComponent
	},
	{
		path: 'order',
		component: OrderPageComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
