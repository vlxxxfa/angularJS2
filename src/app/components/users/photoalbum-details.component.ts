// Imports
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Photoalbum} from "../../models/photoalbum";
import {Observable} from "rxjs";
import {Photo} from "../../models/photo";

@Component({
  templateUrl: './photoalbum-details.component.html',
  // Providers
  providers: [UserService]
})
// Component class implementing OnInit
export class PhotoAlbumDetailsComponent implements OnInit {
  // Private properties for binding
  private sub: any;
  private userName: string;
  private albumTitle: string;
  photos: Array<Photo[]>;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName']; // (+) converts string 'id' to a number
      this.albumTitle = params['albumTitle']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.findAllPhotosByUserNameAndPhotoAlbumTitle(this.userName, this.albumTitle);
    });
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

  createPhotoByAlbumTitleOfUser(userName, albumTitle, title) {
    let photo = {
      title: title
    };
    this.userService.createPhotoByAlbumTitleOfUser(userName, albumTitle, photo).subscribe(
      data => {
        //   console.log(data)
        // refresh the list
        this.findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle);
        return true;
      },
      error => {
        console.error("Error create a new User!");
        return Observable.throw(error);
      }
    );
  }

  deletePhotoByUserNameAndPhotoAlbumTitle(userName, albumTitle, title){
    if (confirm("Are you sure you want to delete " + title + "?")) {
      let photo = {
        title: title
      };
      this.userService.deletePhotoByUserNameAndPhotoAlbumTitle(userName, albumTitle, photo).subscribe(
        data => {
          //   console.log(data)
          // refresh the list
          this.findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle);
          return true;
        },
        error => {
          console.error("Error delete a photo!");
          return Observable.throw(error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}