import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable()
export class QuestionService {
  getQuestions(): Promise<Question[]> {
    return Promise.resolve(null);
  }
}