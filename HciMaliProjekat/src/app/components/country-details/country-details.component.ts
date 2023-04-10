import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CountryDetailsInfoComponent } from '../country-details-info/country-details-info.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { environment } from 'src/environment/environment';
import { Country } from 'src/app/model/country.model';
import { Router } from '@angular/router';

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
export class CountryDetailsComponent implements OnInit {

  @ViewChild(CountryDetailsInfoComponent) countryDetailComponent: CountryDetailsInfoComponent;

  @ViewChild('flag1') flag1: ElementRef;
  @ViewChild('flag2') flag2: ElementRef;
  @ViewChild('flag3') flag3: ElementRef;

  flags: Array<ElementRef> = [];
  flagAnimState: Array<string> = [LARGE_STATE, SMALL_STATE, SMALL_STATE]

  countries: Array<Country> = [] 
  selectedCountry: { country: Country, index: number } = {} as { country: Country, index: number };

  constructor(
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    const localStorageItem = localStorage.getItem("countries")?.toString()!;
    this.countries = JSON.parse(localStorageItem);

    this.selectedCountry.country = this.countries[0];
    this.selectedCountry.index = 0;
  }

  leftSwipe() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    this.countryDetailComponent.leftSwipe();

  }

  rightSwipe() {
    if (!this.countryDetailComponent.isDoneSwiping()) {
      return;
    }

    this.countryDetailComponent.rightSwipe();
  }

}
