import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CountryDetailsInfoComponent } from '../country-details-info/country-details-info.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { environment } from 'src/environment/environment';
import { Country } from 'src/app/model/country.model';

const LARGE_STATE: string = "LARGE_STATE";
const SMALL_STATE: string = "SMALL_STATE";

const ANIMATION_TIME: number = environment.animationTime * 2;

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
  animations: [
    trigger('highlight', [
      state(LARGE_STATE, style({
        'height': '80%',
        'width': '80%'
      })),
      state(SMALL_STATE, style({
        'height': '50%',
        'width': '50%'
      })),
      transition(`${LARGE_STATE} => ${SMALL_STATE}`, animate(ANIMATION_TIME)),
      transition(`${SMALL_STATE} => ${LARGE_STATE}`, animate(ANIMATION_TIME)),
    ]),
  ]
})
export class CountryDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild(CountryDetailsInfoComponent) countryDetailComponent: CountryDetailsInfoComponent;

  @ViewChild('flag1') flag1: ElementRef;
  @ViewChild('flag2') flag2: ElementRef;
  @ViewChild('flag3') flag3: ElementRef;

  flags: Array<ElementRef> = [];
  flagAnimState: Array<string> = [LARGE_STATE, SMALL_STATE, SMALL_STATE]

  countries: Array<Country> = [] 
  selectedCountryIndex: number = 0;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const localStorageItem = localStorage.getItem("countries")?.toString()!;
    this.countries = JSON.parse(localStorageItem);
  }

  ngAfterViewInit(): void {
    this.flags.push(this.flag1);
    this.flags.push(this.flag2);
    this.flags.push(this.flag3);

    for (let i = this.countries.length; i < 3 ; ++i) {
      this.renderer.setStyle(
        this.flags[i].nativeElement,
        'display',
        'none'
      );
    }

    for (let i = 0; i < this.countries.length; ++i) {
      this.renderer.setAttribute(
        this.flags[i].nativeElement,
        'src',
        this.countries[i].flag.toString()
      );

    }

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

  selectCountry(flagId: number) {
    if (!this.countryDetailComponent.isDoneSwiping() || this.countries.length <= 1) {
      return;
    }

    switch (flagId) {
      case 1:
        this.selectFirstCountry();
        break;
      case 2:
        this.selectSecondCountry();
        break;
      case 3:
        this.selectThirdCountry();
        break;
    }

  }

  private selectFirstCountry() {
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

  private selectSecondCountry() {
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

  private selectThirdCountry() {
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
