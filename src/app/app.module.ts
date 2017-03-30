import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent}         from './app.component';
import {routing} from './app.routes';
import {UserListComponent} from "./components/users/user-list.component";
import {UserDetailsComponent} from "./components/users/user-details.component";
import {UserService} from "./services/user.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

