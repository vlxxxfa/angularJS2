// Imports
import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Photo} from "../../models/photo";

@Component({
  templateUrl: './photoalbum-details.component.html',
  styleUrls: ['../../styles.css'],
  // Providers
  providers: [UserService]
})

export class PhotoAlbumDetailsComponent implements OnInit {

  // Private properties for binding
  private sub: any;
  private userName: string;
  private albumTitle: string;
  private fileToUpload: File;
  private photos: Array<Photo[]>;
 // private photos:Photo = [];

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userName = params['userName']; // (+) converts string 'id' to a number
      this.albumTitle = params['albumTitle'];
      this.findAllPhotosByUserNameAndPhotoAlbumTitle(this.userName, this.albumTitle);
    });
  }

  upload() {
    console.debug(this.userName)
    this.userService.fileToUpload(this.userName, this.albumTitle, this.fileToUpload)
      .subscribe(
        res => {
          console.log(res);
          this.findAllPhotosByUserNameAndPhotoAlbumTitle(this.userName, this.albumTitle);
        },
        error => {
          console.log(error);
        })
  }

  selectFile($event): void {
    var inputValue = $event.target;
    this.fileToUpload = inputValue.files[0];
    console.debug("Input File name: " + this.fileToUpload.name + " type:" + this.fileToUpload.size + " size:" + this.fileToUpload.size);
  }

  /*convertByteArrayToBase64(json_probably) {
    var a = 0;

    this.photos = [];

    for (let i in json_probably) {
      let photo: Photo = {
        title : "",
        base64 : json_probably[i]
      };
       this.photos.push(photo);
    //  this.photos[i].base64.push(json_probably[i]);
      a++;
    }
    console.log(a)
   }*/

  findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle) {
    this.userService.findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle).subscribe(
      // the first argument is a function which runs on success
      res => {
        this.photos = res;
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading photos of album')
    );
  }

  /*
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
   }*/

  deletePhotoByUserNameAndPhotoAlbumTitle(userName, albumTitle, id, photoTitle) {
    if (confirm("Are you sure you want to delete " + photoTitle + "?")) {
      this.userService.deletePhotoByUserNameAndPhotoAlbumTitle(userName, albumTitle, id).subscribe(
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
  }

  /* upload(): void {
   console.log('image uploaded');
   let fi = this.fileInput.nativeElement;
   if (fi.files && fi.files[0]) {
   let fileToUpload = fi.files[0];
   this.userService
   .upload(fileToUpload)
   .subscribe(res => {
   console.log(res);
   });
   }
   }*/


}
