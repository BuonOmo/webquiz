import {Component, OnInit} from '@angular/core';
import {Question} from "../question/question";
import {QuestionService} from "../question/question.service";

@Component({
  templateUrl: `/app/test/test.component.html`
})

export class TestComponent implements OnInit{
  questions: Array<Question>;
  ngOnInit(): void {
  }
  
  constructor(private questionService: QuestionService) {};


}
