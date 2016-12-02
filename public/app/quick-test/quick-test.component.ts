import {Component, OnInit, forwardRef} from '@angular/core';
import {QuestionService} from "../question/question.service";
import {TestComponent} from "../test/test.component";
import {StatisticsService} from "../statistics/statistics.service";

@Component({
  templateUrl: `/app/quick-test/quick-test.component.html`,
  providers: [{provide: TestComponent, useExisting: forwardRef(() => QuickTestComponent) }]
})

export class QuickTestComponent extends TestComponent implements OnInit{
  
  
  ngOnInit(): void {
    this.questionService.getQuestion().then(question => this.question = question);
  }
  
  constructor(questionService: QuestionService, statisticsService: StatisticsService) {
    super(questionService, statisticsService);
  }
}
