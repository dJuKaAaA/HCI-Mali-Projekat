import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/model/country.model';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedCountries: Country[] = [];
  allCountries: Country[] = [];

  constructor(
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.countryService
      .fetchAll()
      .subscribe((countries) => {
        this.allCountries = countries;
        this.displayedCountries = this.allCountries
      });
  }

  searchCountries(searchedCountries: Country[]) {
    this.displayedCountries = searchedCountries;
  }

}
