import {Injectable} from '@angular/core';
import {Question} from './question';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class QuestionService {
  private url = '/api/question';
  constructor(private http: Http) {
  };
  
  private handleError(err: any): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err.message || err);
  }
  
  getQuestions(): Promise<Question[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Array<Question>)
      .catch(this.handleError);
  }
  
  getQuestion(id: string) {
    return this.http.get(this.url+'?'+id)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }
}