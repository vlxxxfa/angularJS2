/**
 * Created by vlfa on 01.04.17.
 */
import {Component, ElementRef} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent {

  constructor(private userService: UserService) {
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
        return true;
      },
      error => {
        console.error("Error create a new User!");
        return Observable.throw(error);
      }
    );
  }
}
