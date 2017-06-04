/**
 * Created by vlfa on 01.04.17.
 */
import {Component, ElementRef} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../styles.css']
})

export class RegisterComponent {

  data = {};

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
