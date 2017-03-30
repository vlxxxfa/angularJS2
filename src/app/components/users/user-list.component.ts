// Imports
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  templateUrl: './user-list.component.html',
  // Providers
  providers: [UserService]
})
// Component class implementing OnInit
export class UserListComponent implements OnInit {
  // Private property for binding
  users: Observable<User[]>;
  foundUser: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  // Load data ones componet is ready
  ngOnInit() {
    // Pass retreived pets to the property
    this.users = this.userService.findUsers();
  //  this.foundUser = this.userService.findUser();

  }
}
