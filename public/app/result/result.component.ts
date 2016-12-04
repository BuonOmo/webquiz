import {Component, OnInit} from '@angular/core';
import {ResultService} from "./result.service";
import {Result} from "./result";

@Component({
  templateUrl: `/app/result/result.component.html`
})

export class ResultComponent implements OnInit{
  isValid: boolean;
  result: Result;
  percentage: number;
  /**
   * A number between 0 and 3 to use in an ngSwitch tag. See HTML.
   */
  grade: number;
  
  ngOnInit(): void {
    this.resultService.getLast().then(result => {
      this.result = result;
      let validityTime = new Date;
      validityTime.setSeconds(validityTime.getSeconds() - 30);
      this.isValid = new Date(result.timestamp) >= validityTime;
  
      this.percentage = Math.floor(100 * result.goodAnswers / (result.totalAnswers || 1));
      this.grade = Math.floor(this.percentage / 25);
    });
  }

  constructor(private resultService: ResultService) {};


}
