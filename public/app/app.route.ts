import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import {QuestionComponent} from "./question/question.component";
import {HomeComponent} from "./home/home.component";
import {InstructionsComponent} from "./instructions/instructions.component";
import {ResultComponent} from "./result/result.component";
import {QuickTestComponent} from "./quick-test/quick-test.component";
import {ExamComponent} from "./exam/exam.component"
import {Guard} from "./guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { canActivate: [Guard], path: 'dashboard', component: DashboardComponent },
      { canActivate: [Guard], path: 'question', component: QuestionComponent },
      { canActivate: [Guard], path: 'instructions', component: InstructionsComponent},
      { canActivate: [Guard], path: '', component: HomeComponent},
      { canActivate: [Guard], path: 'test', component: QuickTestComponent},
      { canActivate: [Guard], path: 'result', component: ResultComponent},
      { path: 'exam', component: ExamComponent}
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [Guard]
})
export class AppRoutes {}
