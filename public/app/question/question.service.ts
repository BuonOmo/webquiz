import {Injectable} from '@angular/core';
import {Question} from './question';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class QuestionService {
  
  constructor(private http: Http) {
  };
  
  getQuestions(): Promise<Question[]> {
    return this.http.get('/api/question')
      .toPromise()
      .then(response => response.json() as Array<Question>)
      .catch(this.handleError);
  }
  
  private handleError(err: any): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err.message || err);
  }
}