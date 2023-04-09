import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { environment } from 'src/environment/environment';

const STARTING_STATE_LEFT: string = "STARTING_STATE_LEFT";
const ENDING_STATE_LEFT: string = "ENDING_STATE_LEFT";
const STARTING_STATE_RIGHT: string = "STARTING_STATE_RIGHT";
const ENDING_STATE_RIGHT: string = "ENDING_STATE_RIGHT";

const TO_LEFT_DISAPEAR: string = "TO_LEFT_DISAPEAR";
const FROM_LEFT_APPEAR: string = "FROM_LEFT_APPEAR";
const TO_RIGHT_DISAPEAR: string = "TO_RIGHT_DISAPEAR";
const FROM_RIGHT_APPEAR: string = "FROM_RIGHT_APPEAR";

const ANIMATION_TIME: number = environment.animationTime;
const INVISIBLE_TRANSITION_TIME = ANIMATION_TIME / 4;

@Component({
  selector: 'app-country-details-item',
  templateUrl: './country-details-item.component.html',
  styleUrls: ['./country-details-item.component.css'],
  animations: [
    trigger('swipe-left', [
      state(STARTING_STATE_LEFT, style({
        'transform': 'translate(0, 0)',
        'opacity': '1.0'
      })),
      state(TO_LEFT_DISAPEAR, style({
        'transform': 'translate(-50px, 0)',
        'opacity': '0.0'
      })),
      state(FROM_LEFT_APPEAR, style({
        'transform': 'translate(50px, 0)',
        'opacity': '0.0'
      })),
      state(ENDING_STATE_LEFT, style({
        'transform': 'translate(0, 0)',
        'opacity': '1.0'
      })),
      transition(`${STARTING_STATE_LEFT} => ${TO_LEFT_DISAPEAR}`, animate(ANIMATION_TIME)),
      transition(`${TO_LEFT_DISAPEAR} => ${FROM_LEFT_APPEAR}`, animate(INVISIBLE_TRANSITION_TIME)),
      transition(`${FROM_LEFT_APPEAR} => ${ENDING_STATE_LEFT}`, animate(ANIMATION_TIME)),
    ]),
    trigger('swipe-right', [
      state(STARTING_STATE_RIGHT, style({
        'transform': 'translate(0, 0)',
        'opacity': '1.0'
      })),
      state(TO_RIGHT_DISAPEAR, style({
        'transform': 'translate(50px, 0)',
        'opacity': '0.0'
      })),
      state(FROM_RIGHT_APPEAR, style({
        'transform': 'translate(-50px, 0)',
        'opacity': '0.0'
      })),
      state(ENDING_STATE_RIGHT, style({
        'transform': 'translate(0, 0)',
        'opacity': '1.0'
      })),
      transition(`${STARTING_STATE_RIGHT} => ${TO_RIGHT_DISAPEAR}`, animate(ANIMATION_TIME)),
      transition(`${TO_RIGHT_DISAPEAR} => ${FROM_RIGHT_APPEAR}`, animate(INVISIBLE_TRANSITION_TIME)),
      transition(`${FROM_RIGHT_APPEAR} => ${ENDING_STATE_RIGHT}`, animate(ANIMATION_TIME)),
    ]),
  ]
})
export class CountryDetailsItemComponent implements OnInit {

  rightSwipeState: string = STARTING_STATE_RIGHT;
  leftSwipeState: string = STARTING_STATE_LEFT;
  isDoneSwiping: boolean = true;

  ngOnInit(): void { }

  @Input() title: string = "";
  @Input() content: String = "";

  @ViewChild('itemContent') itemContent: ElementRef;


  constructor(
    private renderer: Renderer2
  ) { }


  leftSwipe() {
    this.isDoneSwiping = false;
    this.leftSwipeState = TO_LEFT_DISAPEAR;
    setTimeout(() => {
      this.leftSwipeState = FROM_LEFT_APPEAR;

      this.renderer.setStyle(
        this.itemContent.nativeElement,
        'opacity',
        '0.0'
      );
      this.renderer.setStyle(
        this.itemContent.nativeElement,
        'transform',
        'translate(50px, 0)'
      );

      setTimeout(() => {
        this.leftSwipeState = ENDING_STATE_LEFT;
        setTimeout(() => {
          this.leftSwipeState = STARTING_STATE_LEFT;
          this.isDoneSwiping = true;
        }, ANIMATION_TIME);
      }, INVISIBLE_TRANSITION_TIME);

    }, ANIMATION_TIME);

  }

  rightSwipe() {
    this.isDoneSwiping = false;
    this.rightSwipeState = TO_RIGHT_DISAPEAR;
    setTimeout(() => {
      this.rightSwipeState = FROM_RIGHT_APPEAR;

      this.renderer.setStyle(
        this.itemContent.nativeElement,
        'opacity',
        '0.0'
      );
      this.renderer.setStyle(
        this.itemContent.nativeElement,
        'transform',
        'translate(-50px, 0)'
      );

      setTimeout(() => {
        this.rightSwipeState = ENDING_STATE_RIGHT;
        setTimeout(() => {
          this.rightSwipeState = STARTING_STATE_RIGHT;
          this.isDoneSwiping = true;
        }, ANIMATION_TIME);
      }, INVISIBLE_TRANSITION_TIME);

    }, ANIMATION_TIME);

  }

}
