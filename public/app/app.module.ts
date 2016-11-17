import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';
import { RouterModule }   from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.route'
import { DashboardComponent }  from './dashboard/dashboard.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, AppRoutes ],
  declarations: [ AppComponent,
  DashboardComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
