import {CUSTOM_ELEMENTS_SCHEMA, NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent}         from './app.component';
import {routing} from './app.routes';
import {UserListComponent} from "./components/users/user-list.component";
import {UserDetailsComponent} from "./components/users/user-details.component";
import {UserService} from "./services/user.service";
import {PhotoAlbumDetailsComponent} from "./components/users/photoalbum-details.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {BsDropdownModule, CarouselModule, TabsModule} from "ngx-bootstrap";
import {NavbarComponent} from "./core/navbar.component";
import {CSSCarouselComponent} from "./core/carousel.component";
import {FilterArrayPipe} from "./components/FilterArrayPipe";

@NgModule({
  imports: [
 //   NavbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    PhotoAlbumDetailsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CSSCarouselComponent,
    FilterArrayPipe
  ],
  providers: [
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {
}

