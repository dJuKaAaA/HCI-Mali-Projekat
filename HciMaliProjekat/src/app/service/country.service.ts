import { Injectable } from '@angular/core';
import { CardCountry } from '../model/card-country.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  public fetchAllCountries(): Observable<CardCountry[]> {
    let countries: CardCountry[] = [];

    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any) => {
        data.forEach((element: any) => {
          let country: CardCountry = {} as CardCountry;
          country.flag = element.flags.png;
          country.name = element.name.common;
          console.log(country.name);
          country.capitalCity = element.capital;
          country.population = element.population;
          country.continents = element.continents;
          countries.push(country);
        });
      });

    return of(countries);
  }
}
