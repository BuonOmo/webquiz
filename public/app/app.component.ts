import { Component  } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1>{{title}}</h1>
    <p>{{value}}</p>
    <a routerLink="/dashboard" routerLinkActive="active">Heroes</a>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = "Tour of heroes";
  private value = "Hello";
}
