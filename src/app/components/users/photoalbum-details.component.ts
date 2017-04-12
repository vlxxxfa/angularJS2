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
  private photos;
 // private photos:Photo = [];

  constructor(private userService: UserService, private route: ActivatedRoute) {
   // this.photos = new Array<Photo>();
    this.photos = [];
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

  convertByteArrayToBase64(json_probably) {
    var a = 0;

    this.photos = [];

    for (let i in json_probably) {

    //  this.photos.push(btoa(json_probably[i]));
      this.photos.push(json_probably[i]);
     //alert(json_probably[i])
    //  alert(i)
      a++;
    }

    for (let i in this.photos){
   //  alert( this.photos[i])
    }
  //  console.log(btoa(json_probably[1]))
    console.log("Array list: " + this.photos.length)

    console.log(a);
   }
/*
  convertByteArrayToBase64(json_probably) {
    var a = 0;

    for (let i in json_probably) {

      for (let photoElementInArray in this.photos) {
        this.photos[photoElementInArray].base64 = btoa(json_probably[i]);
        this.photos.push(this.photos[photoElementInArray]);
      }
      a++;
    }
    console.log("Array list: " + this.photos.length)
    console.log(a);
  }*/

  findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle) {
    this.userService.findAllPhotosByUserNameAndPhotoAlbumTitle(userName, albumTitle).subscribe(
      // the first argument is a function which runs on success
      res => {
        for (let i in res){
        //  alert(res[i])
        }
        this.convertByteArrayToBase64(res);
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

  deletePhotoByUserNameAndPhotoAlbumTitle(userName, albumTitle, title) {
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
