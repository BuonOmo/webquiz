import {Component, OnInit, Input} from '@angular/core';
import { Router }            from '@angular/router';
import {Question} from "./question";
import {QuestionService} from "./question.service";

@Component({
  templateUrl: '/component/question'
})
export class QuestionComponent implements OnInit {
  
  question: Question;
  saved: boolean;
  // HACK: we use a dummy array to avoid ngFor looping each time we change our values,
  //       see this question: http://stackoverflow.com/q/40852107/6320039
  dummyArray: Array<number>;
  
  ngOnInit(): void {
    this.question = new Question;
    this.question.answers = new Array(2);
    this.dummyArray = new Array(2);
  }
  
  constructor(private questionService: QuestionService) {};
  
  debug(): void {
    console.log(this.question);
  }
  
  deleteAnswer(index: number): void {
    if (this.question.answers.length > 2)
      if (this.question.goodAnswer === index) this.question.goodAnswer = null;
      else if (this.question.goodAnswer > index ) this.question.goodAnswer--;
      this.question.answers.splice(index, 1);
      this.dummyArray.pop();
  }
  
  addAnswer(): void {
    if (this.question.answers.length < 4) {
      this.question.answers.push(null);
      this.dummyArray.push(null);
    }
  }
  
  save(): Promise<Question> {
    return this.questionService
      .saveQuestion(this.question)
      .then(question => {
        this.saved = true;
        this.question = new Question;
        this.question.answers = new Array(2);
        this.dummyArray = new Array(2);
        return question;
      })
      .catch(() => this.saved = false);
  }
}
