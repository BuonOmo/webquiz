import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import {Question} from "./question";

@Component({
  templateUrl: 'templates/question'
})
export class QuestionComponent implements OnInit {
  
  question: Question;
  
  ngOnInit(): void {
  }
  
  constructor() {};
  
}
