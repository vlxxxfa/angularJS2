import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private location: Location) { } // inject Location into class constructor

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  private isVisible = false;

  appearInput(visible){
    this.isVisible = visible !== false;
  }
  focusInput(element: any){
    element.focus();
  }
}

