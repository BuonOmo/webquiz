import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user";

@Component({
  templateUrl: `/app/dashboard/dashboard.component.html`
})

export class DashboardComponent implements OnInit{
  totalRatio: number;
  hasTotalRatio: boolean;
  
  ngOnInit(): void {
    this.userService.getUser()
      .then(user => this.calculateStatistics(user));
  }
    
  calculateStatistics(user: User) {
    this.totalRatio = Math.round(user.goodAnswers / user.answers * 100);
    this.hasTotalRatio = !Number.isNaN(this.totalRatio);
  }

  constructor(private userService: UserService) {};


}
