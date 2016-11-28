import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import {QuestionComponent} from "./question/question.component";
import {HomeComponent} from "./home/home.component";
import {InstructionsComponent} from "./instructions/instructions.component";
import {ResultComponent} from "./result/result.component";
import {TestComponent} from "./test/test.component";
import {ExamComponent} from "./exam/exam.component"

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'question', component: QuestionComponent },
      { path: 'instructions', component: InstructionsComponent},
      { path: '', component: HomeComponent},
      { path: 'test', component: TestComponent},
      { path: 'result', component: ResultComponent},
      { path: 'exam', component: ExamComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutes {}
