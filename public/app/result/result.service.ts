import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Result} from "./result";


@Injectable()
export class ResultService {
  private url = '/api/result';
  
  constructor(private http: Http) {
  };
  
  private handleError(err: any): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err.message || err);
  }
  
  getResults() {
    
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Array<Result>)
      .catch(this.handleError);
  }
}