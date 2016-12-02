import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatisticsService {
  private url = '/api/statistics';
  constructor(private http: Http){};
  
  inc(fields: Array<string>): Promise<any> {
    return this.http.patch(this.url + '/increment', fields).toPromise().catch(console.error);
  }
}