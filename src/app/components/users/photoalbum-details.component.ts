// Imports
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Photo} from "../../models/photo";
import {MultipartUploader} from "../../plugins/multipart-upload/multipart-uploader";
import {MultipartItem} from "../../plugins/multipart-upload/multipart-item";

// const URL = 'http://localhost:8080/uploadFile';
const URL = 'http://localhost:8080/users/' + this.userName + '/' + this.albumTitle + '/photos/createPhotoByAlbumTitleOfUser/';

@Component({
  templateUrl: './photoalbum-details.component.html',
  styleUrls: ['../../styles.css'],
  // Providers
  providers: [UserService]
})
// Component class implementing OnInit
export class PhotoAlbumDetailsComponent implements OnInit {

  private uploader: MultipartUploader = new MultipartUploader({url: URL});

  multipartItem: MultipartItem = new MultipartItem(this.uploader);

  file: File;

  upload : () => void;
  uploadCallback : (data) => void;

  // Private properties for binding
  private sub: any;
  private userName: string;
  private albumTitle: string;
  photos: Array<Photo[]>;

  filesToUpload: Array<File>;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.filesToUpload = [];

    this.upload = () => {
      console.debug("home.ts & upload() ==>");
      if (null == this.file) {
        console.error("home.ts & upload() form invalid.");
        return;
      }
      if (this.multipartItem == null) {
        this.multipartItem = new MultipartItem(this.uploader);
      }
      if (this.multipartItem.formData == null)
        this.multipartItem.formData = new FormData();

      this.multipartItem.formData.append("file", this.file);

      this.multipartItem.callback = this.uploadCallback;
      this.multipartItem.upload();
    }

    this.uploadCallback = (data) => {
      console.debug("home.ts & uploadCallback() ==>");
      this.file = null;
      if (data){
        console.debug("home.ts & uploadCallback() upload file success.");
      }else{
        console.error("home.ts & uploadCallback() upload file false.");
      }
    }
  }

  selectFile($event): void {
    var inputValue = $event.target;
    if( null == inputValue || null == inputValue.files[0]){
      console.debug("Input file error.");
      return;
    }else {
      this.file = inputValue.files[0];
      console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
    }
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
