// Imports
import {Injectable}    from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../models/user";
import {map} from "rxjs/operator/map";
import {Observable} from "rxjs";

// Decorator to tell Angular that this class can be injected as a service to another class
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  private baseUrl = 'http://localhost:8080/users/';

  findUsers() {
    // Return response
    return this.http.get(this.baseUrl + 'findAllUsers')
      .map(response => response.json());
    // .catch(error => Observable.throw(error.json().error || 'Server error')));
  }

  findUserByUserNameAndPassword(username, password) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    // Return response
    return this.http.get(this.baseUrl + 'findUser/' + username + '/' + password + options)
      .map(response => response.json());
    // .catch(error => Observable.throw(error.json().error || 'Server error')));
  }

  // Add a new user
  createUser(user) {
    let bodyString = JSON.stringify(user); // Stringify payload
    console.log(bodyString);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'createUser', bodyString, options) // ...using post request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  // Update a new user
  updateUser(user) {
    let bodyString = JSON.stringify(user); // Stringify payload
    console.log(bodyString);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'updateUser', bodyString, options) // ...using post request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  deleteUser(username) {
    console.log(username);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'deleteUser/' + username, options) // ...using post request
  }

  findAllPhotoAlbenByUser(username) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    // Return response
    return this.http.get(this.baseUrl + username + '/photoAlben/findAllPhotoAlbenByUserName')
      .map(response => response.json());
    // .catch(error => Observable.throw(error.json().error || 'Server error')));
  }

  // Add a new photoAlbum to exist user
  createPhotoAlbumByUser(userName, photoAlbum) {
    let bodyString = JSON.stringify(photoAlbum); // Stringify payload
    console.log(bodyString);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + userName + '/photoAlben/createPhotoAlbumByUserName', bodyString, options) // ...using post request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  deletePhotoAlbumByUser(userName, albumTitle) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + userName + '/photoAlben/' + 'deletePhotoAlbumByUserName/' + albumTitle, options) // ...using post request
  }

  fileToUpload(userName, albumTitle, file: File) {

    return Observable.fromPromise(new Promise((resolve, reject) => {

      var url = this.baseUrl + userName + '/' + albumTitle + '/photos/savePhotoByAlbumTitleOfUser/'

      var formData: any = new FormData();
      formData.append("file", file, file.name);

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response)
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    }));
  }

  findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle) {

    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // Return response
    return this.http.get(this.baseUrl + userName + '/' + albumTitle + '/photos/findAllPhotosByUserNameAndPhotoAlbumTitle')
    .map(res => res.json())
    //  .map(response => response.json());
    // .catch(error => Observable.throw(error.json().error || 'Server error')));
  }

  deletePhotoByUserNameAndPhotoAlbumTitle(userName, albumTitle, id) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + userName + '/' + albumTitle + '/photos/' + 'deletePhotoByUserNameAndPhotoAlbumTitle/' + id, options) // ...using post request

  }


  /*
   createPhotoByAlbumTitleOfUser(userName, albumTitle, photo) {
   let bodyString = JSON.stringify(photo); // Stringify payload
   console.log(bodyString);
   let headers = new Headers({'Content-Type': 'application/json'});
   let options = new RequestOptions({headers: headers});
   return this.http.post(this.baseUrl + userName + '/' + albumTitle+ '/photos/createPhotoByAlbumTitleOfUser', bodyString, options) // ...using post request
   .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
   }
   */

}
