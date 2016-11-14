import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { AppComponent } from './app.components';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent },
      { path: '', component: AppComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutes {}
