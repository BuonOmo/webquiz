import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {Question} from "./question";

@Component({
  templateUrl: '/app/question/question.component.html'
})
export class QuestionComponent implements OnInit {
  
  question: Question;
  
  ngOnInit(): void {
    this.question = new Question;
    this.question.answers = new Array(2);
  }
  
  constructor() {};
  
  debug(): void {
    console.log(this.question);
  }
  
  deleteAnswer(index: number): void {
    if (this.question.answers.length > 2)
      this.question.answers.splice(index, 1);
  }
  
  addAnswer(): void {
    if (this.question.answers.length < 4)
      this.question.answers.push(null);
  }
}
