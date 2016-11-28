import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';
import { RouterModule }   from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.route'
import { DashboardComponent }  from './dashboard/dashboard.component';
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {QuestionComponent} from "./question/question.component";
import {HomeComponent} from "./home/home.component";

@NgModule({
  imports: [ BrowserModule, FormsModule, AppRoutes ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    QuestionComponent,
    HomeComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
