import { ChangeDetectionStrategy,ChangeDetectorRef, Component, Input , OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import { Observable } from "rxjs";

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
        state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
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
    trigger('fade', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
    state('outp', style({ 'opacity': '0' })),
    transition('in => out', [
      animate('200ms ease-out', keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: 0, transform: 'translateX(-25%)',     offset: 1.0}),
          ]))
    ]),
    transition('out => in', [
      animate('200ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(25%)', offset: 0}),
            style({opacity: 1, transform: 'translateX(0%)',     offset: 1.0}),
          ]))
    ]),
    transition('in => outp', [
      animate('200ms ease-out', keyframes([
            style({opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({opacity: 0, transform: 'translateX(25%)',     offset: 1.0}),
          ]))
    ]),
    transition('outp => in', [
      animate('200ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-25%)', offset: 0}),
            style({opacity: 1, transform: 'translateX(0%)',     offset: 1.0}),
          ]))
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
autoSlide:number;
totalImages:number = this.images.length;
fadeState:string = "in";

zoomMe(image, i) {
      this.zoomImage = image;
      this.activePane = 'right';
      this.currIndex = i;
      this.autoSlide= setInterval( () => {
        this.fadeState = "out";
        if(this.currIndex < this.images.length-1){
        this.currIndex = this.currIndex +1;
    }else{
      this.currIndex = 0;
    }
        this.ref.markForCheck();
      },4000);
  }
  backslide(){
    this.activePane = "left";
    clearInterval(this.autoSlide);
    return false;
  }
  zoomMeMore(image) {
    clearInterval(this.autoSlide);
    image.state = (image.state === 'small' ? 'large' : 'small');
  }
  preImg(){
    clearInterval(this.autoSlide);
    if(this.currIndex > 0){
      this.fadeState = "outp";
      this.currIndex = this.currIndex -1;
    }
    return false;
  }
  nxtImg(){
    clearInterval(this.autoSlide);
    this.fadeState = "out";
    if(this.currIndex < this.images.length-1){
        this.currIndex = this.currIndex +1;
    }
    return false;
  }
 constructor(private ref: ChangeDetectorRef) {

 }

  ngOnInit() {
  }
 onDone($event) {
   console.log(this.fadeState);
   
   if(this.fadeState = "out"){
    
    this.zoomImage = this.images[this.currIndex];
    
    this.ref.markForCheck();
    this.fadeState = "in";
  }
  }

}
