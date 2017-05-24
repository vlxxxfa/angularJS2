import {Component} from '@angular/core';
import {Image} from '../models/image';

@Component({
  selector: 'css-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['carousel.component.css', '../styles.css'],
})

//Carousel Component itself
export class CSSCarouselComponent {
  //images data to be bound to the template
  public images = IMAGES;
}

//IMAGES array implementing Image interface
var IMAGES: Image[] = [
  { "title": "We are covered", "url": "/Users/vlfa/Desktop/FrontendForBA/src/app/assets/img/1.jpg" },
  { "title": "Generation Gap", "url": "../assets/img/2.jpg" },
  { "title": "Potter Me", "url": "../assets/img/3.jpg" },
  { "title": "Pre-School Kids", "url": "../assets/img/4.jpg" },
  { "title": "Young Peter Cech", "url": "../assets/img/5.jpg" }
];
