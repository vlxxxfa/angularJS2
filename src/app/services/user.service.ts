// Imports
import { Injectable }    from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Decorator to tell Angular that this class can be injected as a service to another class
@Injectable()
export class UserService {

  constructor(private http: Http) {}

  private baseUrl = 'http://localhost:8080/users/';

  findUsers() {
    // Return response
    return this.http.get(this.baseUrl + 'findAllUsers')
      .map(response => response.json());
       // .catch(error => Observable.throw(error.json().error || 'Server error')));
  }

  findUserByUserName(userName: string, passWord) {
    return this.http.get(this.baseUrl + 'findUser/' + userName +'/'+ passWord)
      .map(response => response.json());
      //  .catch(error => Observable.throw(error.json().error || 'Server error')));
  }
}
