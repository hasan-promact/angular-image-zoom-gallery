import { ChangeDetectionStrategy, Component, Input , OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import { Image } from '../image';
import { IMAGES } from '../images-list';

type PaneType = 'left' | 'right';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('imgZoom', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(2)',
        })),
        transition('small <=> large', animate('.1s ease-in'))
    ]),
    trigger('images', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),
     trigger('slide', [
      state('left', style({ transform: 'translateX(100%)' })),
      state('right', style({ transform: 'translateX(0%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class HomeComponent implements OnInit {
images = IMAGES;
zoomImage:Image;
activePane: string = 'left';
currIndex:number;
zoomMe(image, i) {
      this.zoomImage = image;
      this.activePane = 'right';
      this.currIndex = i;
  }
  backslide(){
    this.activePane = "left";
    return false;
  }
  zoomMeMore(image) {
    image.state = (image.state === 'small' ? 'large' : 'small');
  }
  preImg(){
    if(this.currIndex > 0){
      this.currIndex = this.currIndex -1;
      this.zoomImage = this.images[this.currIndex];
    }
    return false;
  }
  nxtImg(){
    if(this.currIndex < this.images.length-1){
        this.currIndex = this.currIndex +1;
        this.zoomImage = this.images[this.currIndex];
    }
    return false;
  }
  constructor() { }

  ngOnInit() {
  }

}
