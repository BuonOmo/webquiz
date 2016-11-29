import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {User} from "./user";


@Injectable()
export class UserService {
  
  constructor(private http: Http) {
  };
  
  getUser(): Promise<User> {
    return this.http.get('/api/user')
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }
  
  private handleError(err: any): Promise<any> {
    console.error('An error occurred', err);
    return Promise.reject(err.message || err);
  }
  
  removeStatistics(): Promise<any>{
    return Promise.all([
      this.http.delete('/api/statistics').toPromise(),
      this.http.delete('/api/result').toPromise()
    ]);
  }
}