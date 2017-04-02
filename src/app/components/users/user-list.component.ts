// Imports
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['../../styles.css'],
  // Providers
  providers: [UserService]
})
// Component class implementing OnInit
export class UserListComponent implements OnInit {
  // Private property for binding
  users: Array<User[]>;
  private user: Observable<User[]>;


  constructor(private userService: UserService) {
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
