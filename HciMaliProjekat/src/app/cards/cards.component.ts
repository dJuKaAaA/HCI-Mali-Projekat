import { Component, Input, OnInit } from '@angular/core';
import { CardCountry } from './../model/card-country.model';
import { CountryService } from '../service/country.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() countries: CardCountry[] = [];

  public selectedCards: CardCountry[] = [];
  // public countries: CardCountry[] = [];
  constructor(private countryService: CountryService) {}
  // constructor() {}

  ngOnInit(): void {
    this.countryService
      .fetchAllCountries()
      .subscribe((countries) => (this.countries = countries));
  }

  public onSelectCard(selectedCountryCard: CardCountry): void {
    console.log(this.selectedCards);
    if (
      this.selectedCards.some((card) => card.name === selectedCountryCard.name)
    ) {
      this.selectedCards = this.selectedCards.filter(
        (card) => card.name !== selectedCountryCard.name
      );
    } else if (this.selectedCards.length < 3) {
      this.selectedCards.push(selectedCountryCard);
    }
  }

  public saveCountriesToLocaleStorage() {
    localStorage.setItem('countries', JSON.stringify(this.selectedCards));
  }

  // Za details ovde cacuvati
}
