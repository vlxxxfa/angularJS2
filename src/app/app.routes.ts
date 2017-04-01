// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {userRoutes} from "./components/users/user.routes";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
    // Add routes form a different file
  ...userRoutes,
  {
    path: '**',
    redirectTo: '/'
  }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
