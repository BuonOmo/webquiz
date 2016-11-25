import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import {QuestionComponent} from "./question/question.component";
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'question', component: QuestionComponent },
      { path: '', component: AppComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutes {}
