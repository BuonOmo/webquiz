import {Component, OnInit} from '@angular/core';
import {Question} from "../question/question";
import {QuestionService} from "../question/question.service";

@Component({
  templateUrl: `/app/test/test.component.html`
})

export class TestComponent implements OnInit{
  question: Question;
  count: number = 0;
  score: number = 0;
  
  ngOnInit(): void {
    this.questionService.getQuestion().then(question => this.question = question);
  }
  
  constructor(private questionService: QuestionService) {};

  nextQuestion() {
    this.count++;
    this.questionService.getQuestion().then(question => this.question = question);
  }
}
