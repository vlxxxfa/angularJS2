// Imports
// Deprecated import
// import { RouterConfig } from '@angular/router';
import { Routes } from '@angular/router';

import {UserListComponent}    from './user-list.component';
import {UserDetailsComponent}    from './user-details.component';
import {PhotoAlbumDetailsComponent} from "./photoalbum-details.component";

// Route Configuration
export const userRoutes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user-details/:userName', component: UserDetailsComponent },
  { path: 'photoalbum-details/:userName/:albumTitle', component: PhotoAlbumDetailsComponent }

];
