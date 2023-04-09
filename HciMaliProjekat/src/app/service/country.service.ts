import { Injectable } from '@angular/core';
import { Country } from '../model/country.model';
import { HttpClient } from '@angular/common/http';
import { Observable, count, map, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  public fetchAll(): Observable<Country[]> {
    let countries: Country[] = [];

    this.http
      .get(`${environment.countriesEndpointUrl}/v3.1/all`)
      .subscribe((data: any) => {
        data.forEach((element: any) => {
          let country: Country = this.convertToCountry(element);
          countries.push(country);
        });
      });

    return of(countries);
  }

  public fetchByName(name: String): Observable<Country> {
    let country: Country = {} as Country;
    this.http
      .get(`${environment.countriesEndpointUrl}/v3.1/name/${name}`)
      .subscribe((data: any) => {
        data.forEach((element: any) => {
          country = this.convertToCountry(element);
        });
      });

    return of(country);
  }

  private getCurrencies(apiCountry: any): String[] {
    let currencies: String[] = [];
    if (apiCountry.currencies) {
      const keys = Object.keys(apiCountry.currencies);
      keys.forEach((key) => {
        currencies.push(apiCountry.currencies[key].name);
      });
    }
    return currencies;
  }

  private convertToCountry(apiCountry: any): Country {
    let country: Country = {} as Country;
    country.name = apiCountry.name.common;
    country.flag = apiCountry.flags.png;
    country.currencies = this.getCurrencies(apiCountry);
    country.capitalCity = apiCountry.capital;
    country.population = apiCountry.population;
    country.continents = apiCountry.continents;
    country.region = apiCountry.region;
    country.subregion = apiCountry.subregion;
    country.latitude = apiCountry.latlng[0];
    country.longitude = apiCountry.latlng[1];
    country.map = apiCountry.maps.openStreetMaps;
    country.crest = apiCountry.coatOfArms.png;
    country.timeZones = apiCountry.timezones;
    country.languages = this.getLanguages(apiCountry);
    if (apiCountry.postalCode?.format)
      country.postalCode = apiCountry.postalCode?.format;
    else country.postalCode = '';
    // console.log(country);
    return country;
  }

  private getLanguages(apiCountry: any): String[] {
    let languages: String[] = [];
    for (let language in apiCountry.languages) {
      languages.push(apiCountry.languages[language]);
    }
    return languages;
  }
}
