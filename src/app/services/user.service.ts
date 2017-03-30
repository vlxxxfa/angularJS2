// Imports
import { Injectable }    from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../models/user";
import {map} from "rxjs/operator/map";

// Decorator to tell Angular that this class can be injected as a service to another class
@Injectable()
export class UserService {

  private user: User;

  constructor(private http: Http) {
  }

  private baseUrl = 'http://localhost:8080/users/';

  findUsers() {
    // Return response
    return this.http.get(this.baseUrl + 'findAllUsers')
      .map(response => response.json());
    // .catch(error => Observable.throw(error.json().error || 'Server error')));
  }

  // Add a new comment
  createUser(user) {
    let bodyString = JSON.stringify(user); // Stringify payload
    console.log(bodyString);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'createUser', bodyString, options) // ...using post request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  deleteUser(username) {
    console.log(username);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'deleteUser/' + username, options) // ...using post request
    
    /* findUserByUserName(userName: string, passWord) {
     return this.http.get(this.baseUrl + 'findUser/' + userName +'/'+ passWord)
     .map(response => response.json());
     //  .catch(error => Observable.throw(error.json().error || 'Server error')));
     }*/
  }
}