/**
 * Created by vlfa on 01.04.17.
 */
import {Component, ElementRef} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.css'],
  providers: [UserService]
})

export class LoginComponent {

  data = {};

  login(userName, passWord) {
    alert("Username: " + userName + "\nPassword: " +  passWord)
  };

  constructor(private userService: UserService) {
  }

}
