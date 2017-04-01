// Imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Photoalbum} from "../../models/photoalbum";
import {Observable} from "rxjs";
import {Photo} from "../../models/photo";

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
  photoalben: Array<Photoalbum[]>;
  photos: Array<Photo[]>;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.findAllPhotoAlbenByUser(this.userName);
    });
  }

  findAllPhotoAlbenByUser(username) {
    this.userService.findAllPhotoAlbenByUser(username).subscribe(
      // the first argument is a function which runs on success
      data => {
        this.photoalben = data
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading photoAlben of user')
    );
  }

  createPhotoAlbumByUser(userName, albumTitle) {
    let photoAlbum = {
      albumTitle: albumTitle
    };
    this.userService.createPhotoAlbumByUser(userName, photoAlbum).subscribe(
      data => {
        //   console.log(data)
        // refresh the list
        this.findAllPhotoAlbenByUser(userName);
        return true;
      },
      error => {
        console.error("Error create a new User!");
        return Observable.throw(error);
      }
    );
  }

  findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle) {
    this.userService.findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle).subscribe(
      // the first argument is a function which runs on success
      data => {
        this.photos = data
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading photos of album')
    );
  }

  deletePhotoAlbumByUser(userName, albumTitle){
    if (confirm("Are you sure you want to delete " + albumTitle + "?")) {
      this.userService.deletePhotoAlbumByUser(userName, albumTitle).subscribe(
        data => {
          //   console.log(data)
          // refresh the list
          this.findAllPhotoAlbenByUser(userName);
          return true;
        },
        error => {
          console.error("Error delete a photoAlbum!");
          return Observable.throw(error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
