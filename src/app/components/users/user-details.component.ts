// Imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  templateUrl: './user-details.component.html',
  // Providers
  providers: [UserService]
})
// Component class implementing OnInit
export class UserDetailsComponent implements OnInit {
  // Private properties for binding
  private sub: any;
  private user: string[];

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  // Load data ones componet is ready
  ngOnInit() {
    // Subscribe to route params
    this.sub = this.route.params.subscribe(params => {
      let userName = params['userName'];
      let passWord = params['passWord'];
      // Retrieve Pet with Id route param
  //    this.userService.findUserByUserName(userName, passWord).subscribe(
      (user => this.user = user);
      console.log(this.sub)
    });
  }

  /* ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }*/
}
