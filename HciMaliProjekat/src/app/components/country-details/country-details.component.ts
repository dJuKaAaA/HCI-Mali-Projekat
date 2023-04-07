import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CountryDetailsInfoComponent } from '../country-details-info/country-details-info.component';
import { trigger, transition, style, animate, state } from '@angular/animations';

const LARGE_STATE: string = "LARGE_STATE";
const SMALL_STATE: string = "SMALL_STATE";

const ANIMATION_TIME: number = 500;

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
  animations: [
    trigger('highlight', [
      state(LARGE_STATE, style({
        'height': '90%'
      })),
      state(SMALL_STATE, style({
        'height': '50%'
      })),
      transition(`${LARGE_STATE} => ${SMALL_STATE}`, animate(ANIMATION_TIME)),
      transition(`${SMALL_STATE} => ${LARGE_STATE}`, animate(ANIMATION_TIME)),
    ]),
  ]
})
export class CountryDetailsComponent implements AfterViewInit {

  @ViewChild(CountryDetailsInfoComponent) countryDetailComponent: CountryDetailsInfoComponent;

  @ViewChild('flag1') flag1: ElementRef;
  @ViewChild('flag2') flag2: ElementRef;
  @ViewChild('flag3') flag3: ElementRef;

  flags: Array<ElementRef> = [];
  flagAnimState: Array<string> = [LARGE_STATE, SMALL_STATE, SMALL_STATE]

  countries: Array<any> = [{}, {}, {}] 
  selectedCountryIndex: number = 0;

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.flags.push(this.flag1);
    this.flags.push(this.flag2);
    this.flags.push(this.flag3);

    for (let i = (3 - this.countries.length) - 1; i >= 0; --i) {
      this.renderer.setStyle(
        this.flags[i].nativeElement,
        'display',
        'none'
      );
      this.renderer.setStyle(
        this.flags[i].nativeElement,
        'height',
        '90%'
      );

    }

    // this.flags[this.selectedCountryIndex].nativeElement.classList.remove('flag');
    // this.flags[this.selectedCountryIndex].nativeElement.classList.add('selected-flag');

  }

  leftSwipe() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    this.countryDetailComponent.leftSwipe();

    this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
    ++this.selectedCountryIndex;
    this.flagAnimState[this.selectedCountryIndex] = LARGE_STATE;

  }

  rightSwipe() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    this.countryDetailComponent.rightSwipe();

    this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
    --this.selectedCountryIndex;
    this.flagAnimState[this.selectedCountryIndex] = LARGE_STATE;
  }

  selectFirstCountry() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    switch (this.selectedCountryIndex) {
      case 0:
        break
      case 1:
        this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
        this.flagAnimState[0] = LARGE_STATE;
        this.countryDetailComponent.rightSwipe();
        break;
      case 2:
        this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
        this.flagAnimState[0] = LARGE_STATE;
        this.countryDetailComponent.rightSwipe();
        break;
    }
    this.selectedCountryIndex = 0;
  }

  selectSecondCountry() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    switch (this.selectedCountryIndex) {
      case 0:
        this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
        this.flagAnimState[1] = LARGE_STATE;
        this.countryDetailComponent.leftSwipe();
        break
      case 1:
        break;
      case 2:
        this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
        this.flagAnimState[1] = LARGE_STATE;
        this.countryDetailComponent.rightSwipe();
        break;
    }
    this.selectedCountryIndex = 1;
  }

  selectThirdCountry() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    switch (this.selectedCountryIndex) {
      case 0:
        this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
        this.flagAnimState[2] = LARGE_STATE;
        this.countryDetailComponent.leftSwipe();
        break
      case 1:
        this.flagAnimState[this.selectedCountryIndex] = SMALL_STATE;
        this.flagAnimState[2] = LARGE_STATE;
        this.countryDetailComponent.leftSwipe();
        break;
      case 2:
        break;
    }
    this.selectedCountryIndex = 2;
  }

}
