// Imports
// Deprecated import
// import { RouterConfig } from '@angular/router';
import { Routes } from '@angular/router';

import {UserListComponent}    from './user-list.component';
import {UserDetailsComponent}    from './user-details.component';

// Route Configuration
export const userRoutes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent }
];
