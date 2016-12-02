import {Injectable} from '@angular/core';
import {Question, Answer} from './question';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class QuestionService {
  private url = '/api/question/short';
  constructor(private http: Http) {
  };
  
  private handleError(err: any): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err.message || err);
  }
  
  getQuestion(id?: string) {
    let url = this.url;
    if (id) url += '/'+id;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }
  
  getAnswer(id: string, index: number) {
    return this.http.get('/api/ans/'+id+'/'+index)
      .toPromise()
      .then(response => response.json() as Answer)
      .catch(this.handleError)
  }
  
  saveQuestion(question: Question): Promise<Question> {
    return this.http.post('/api/question', question)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }
}