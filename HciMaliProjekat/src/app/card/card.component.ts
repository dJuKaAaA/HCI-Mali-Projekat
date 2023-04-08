import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../model/country.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() country: Country = {} as Country;
  @Input() numberOfSelectedCards = 0;
  isSelected: boolean = false;

  ngOnInit(): void {}

  onCardSelected() {
    if (this.numberOfSelectedCards < 3 && !this.isSelected) {
      this.isSelected = !this.isSelected;
    } else if (this.isSelected) {
      this.isSelected = !this.isSelected;
    }
  }

  onDetailsClick(country: Country) {
    localStorage.setItem('countries', JSON.stringify([country]));
  }
}
