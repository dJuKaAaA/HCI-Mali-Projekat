import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../model/country.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() countries: Country[] = [];
  public selectedCards: Country[] = [];
  selectedCountries: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.countries.forEach((el) => {
      this.selectedCountries[el.name.toString()] = false;
    });
  }

  public onSelectCard(selectedCountryCard: Country): void {
    // console.log(this.selectedCards);

    if (
      this.selectedCards.some((card) => card.name === selectedCountryCard.name)
    ) {
      this.selectedCards = this.selectedCards.filter(
        (card) => card.name !== selectedCountryCard.name
      );
      this.selectedCountries[selectedCountryCard.name.toString()] = false;
    } else if (this.selectedCards.length < 3) {
      this.selectedCards.push(selectedCountryCard);
      this.selectedCountries[selectedCountryCard.name.toString()] = true;
    }
  }

  public onCompareClick() {
    localStorage.setItem('countries', JSON.stringify(this.selectedCards));
    this.router.navigate(['details']);
  }
}
