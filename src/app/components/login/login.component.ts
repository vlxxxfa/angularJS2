/**
 * Created by vlfa on 01.04.17.
 */
import {Component, ElementRef} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.css'],
  providers: [UserService]
})

export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  login(userName, passWord) {
    this.userService.findUserByUserNameAndPassword(userName, passWord)
      .subscribe(
        data => {
          this.router.navigate(['/users'])
         console.log(data)
        // refresh the list
        console.log("Hello admin!")
        return true;
      },
      error => {
        console.error("Error find a User!");
        return Observable.throw(error);
      }
    );
  }
}
