import { Component, Input, OnInit } from '@angular/core';
import { Country } from './../model/country.model';
import { CountryService } from '../service/country.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() countries: Country[] = [];

  public selectedCards: Country[] = [];
  // public countries: Country[] = [];
  constructor(private countryService: CountryService) {}
  // constructor() {}

  ngOnInit(): void {
    this.countryService
      .fetchAll()
      .subscribe((countries) => (this.countries = countries));
  }

  public onSelectCard(selectedCountryCard: Country): void {
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

  public onCompareClick() {
    localStorage.setItem('countries', JSON.stringify(this.selectedCards));
  }
}
