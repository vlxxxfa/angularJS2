// Imports
import {Component, Host, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../../app.component";
import {FilterArrayPipe} from "../FilterArrayPipe";

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css', '../../styles.css'],
  // Providers
  providers: [UserService, FilterArrayPipe]
})
// Component class implementing OnInit
export class UserListComponent implements OnInit {
  // Private property for binding
  users: Array<User[]>;
  private user: Observable<User[]>;
  private myApp;

  private todos = ["test1","test2","test3","test4","test5"];

  constructor(private userService: UserService, @Host() myApp: AppComponent) {
    this.myApp = myApp;
  }

  // Load data ones component is ready
  ngOnInit() {
    this.findUsers();
  }

  findUsers() {
    this.userService.findUsers().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.users = data;
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading users')
    );
  }

  createUser(userName, passWord, email) {
    let user = {
      userName: userName,
      passWord: passWord,
      email: email
    };
    this.userService.createUser(user).subscribe(
      data => {
        //   console.log(data)
        // refresh the list
        this.findUsers();
        return true;
      },
      error => {
        console.error("Error create a new User!");
        return Observable.throw(error);
      }
    );
  }

  updateUser(userName, passWord, email) {
    let user = {
      userName: userName,
      passWord: passWord,
      email: email
    };
    this.userService.updateUser(user).subscribe(
      data => {
        //   console.log(data)
        // refresh the list
        this.findUsers();
        return true;
      },
      error => {
        console.error("Error update a exist User!");
        return Observable.throw(error);
      }
    );
  }

  deleteUser(userName) {
    if (confirm("Are you sure you want to delete " + userName + "?")) {
      this.userService.deleteUser(userName).subscribe(
        data => {
          //   console.log(data)
          // refresh the list
          this.findUsers();
          return true;
        },
        error => {
          console.error("Error delete a user!");
          return Observable.throw(error);
        }
      );
    }
  }

  findUserByUserNameAndPassword(username, password){

    console.log(this.userService.findUserByUserNameAndPassword(username, password));
  }
}
