// Imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  templateUrl: './user-details.component.html',
  // Providers
  providers: [UserService]
})
// Component class implementing OnInit
export class UserDetailsComponent implements OnInit {
  // Private properties for binding
  private sub: any;
  private userName: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
