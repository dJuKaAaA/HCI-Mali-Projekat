import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CountryDetailsItemComponent } from '../country-details-item/country-details-item.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { environment } from 'src/environment/environment';
import { Country } from 'src/app/model/country.model';

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
  selector: 'app-country-details-info',
  templateUrl: './country-details-info.component.html',
  styleUrls: ['./country-details-info.component.css'],
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
export class CountryDetailsInfoComponent implements OnInit, AfterViewInit {

  @ViewChildren(CountryDetailsItemComponent) items: Array<CountryDetailsItemComponent>;

  @ViewChild('crest') crest: ElementRef;
  @ViewChild('flag') flag: ElementRef;

  rightSwipeStateCrest: string = STARTING_STATE_RIGHT;
  leftSwipeStateCrest: string = STARTING_STATE_LEFT;
  private isDoneSwipingCrest: boolean = true;

  @Input() countries: Country[];
  @Input() selectedCountry: { country: Country, index: number } = {} as { country: Country, index: number };

  @ViewChild('countryDetailsContainer') countryDetailsContainerRef: ElementRef;

  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    let columnDefinition = "100%";
    switch (this.countries.length) {
      case 1:
        columnDefinition = "100%";
        break;
      case 2:
        columnDefinition = "50% 50%";
        break;
      case 3:
        columnDefinition = "33% 33% 33%";
        break;
    }

    this.renderer.setStyle(
      this.countryDetailsContainerRef.nativeElement,
      'display',
      'grid'
    );
    this.renderer.setStyle(
      this.countryDetailsContainerRef.nativeElement,
      'grid-template-columns',
      columnDefinition
    );
    
  }

  private leftSwipeCrest() {
    this.isDoneSwipingCrest = false;
    this.leftSwipeStateCrest = TO_LEFT_DISAPEAR;
    setTimeout(() => {
      this.leftSwipeStateCrest = FROM_LEFT_APPEAR;

      this.renderer.setStyle(
        this.crest.nativeElement,
        'opacity',
        '0.0'
      );
      this.renderer.setStyle(
        this.crest.nativeElement,
        'transform',
        'translate(50px, 0)'
      );
      this.renderer.setStyle(
        this.flag.nativeElement,
        'opacity',
        '0.0'
      );
      this.renderer.setStyle(
        this.flag.nativeElement,
        'transform',
        'translate(50px, 0)'
      );
      ++this.selectedCountry.index;
      this.selectedCountry.country = this.countries[this.selectedCountry.index];

      setTimeout(() => {
        this.leftSwipeStateCrest = ENDING_STATE_LEFT;
        setTimeout(() => {
          this.leftSwipeStateCrest = STARTING_STATE_LEFT;
          this.isDoneSwipingCrest = true;
        }, ANIMATION_TIME);
      }, INVISIBLE_TRANSITION_TIME);

    }, ANIMATION_TIME);

  }

  private rightSwipeCrest() {
    this.isDoneSwipingCrest = false;
    this.rightSwipeStateCrest = TO_RIGHT_DISAPEAR;
    setTimeout(() => {
      this.rightSwipeStateCrest = FROM_RIGHT_APPEAR;

      this.renderer.setStyle(
        this.crest.nativeElement,
        'opacity',
        '0.0'
      );
      this.renderer.setStyle(
        this.crest.nativeElement,
        'transform',
        'translate(-50px, 0)'
      );
      this.renderer.setStyle(
        this.flag.nativeElement,
        'opacity',
        '0.0'
      );
      this.renderer.setStyle(
        this.flag.nativeElement,
        'transform',
        'translate(-50px, 0)'
      );

      --this.selectedCountry.index;
      this.selectedCountry.country = this.countries[this.selectedCountry.index];

      setTimeout(() => {
        this.rightSwipeStateCrest = ENDING_STATE_RIGHT;
        setTimeout(() => {
          this.rightSwipeStateCrest = STARTING_STATE_RIGHT;
          this.isDoneSwipingCrest = true;
        }, ANIMATION_TIME);
      }, INVISIBLE_TRANSITION_TIME);

    }, ANIMATION_TIME);
  } 

  leftSwipe() {
    for (let item of this.items) {
      item.leftSwipe();
    }
    this.leftSwipeCrest();
  }

  rightSwipe() {
    for (let item of this.items) {
      item.rightSwipe();
    }
    this.rightSwipeCrest();
  }

  isDoneSwiping(): boolean {
    let isDoneSwiping: boolean = true;
    for (let item of this.items) {
      if (!item.isDoneSwiping) {
        isDoneSwiping = false;
        break;
      }
    }

    return isDoneSwiping && this.isDoneSwipingCrest;
  }

}
