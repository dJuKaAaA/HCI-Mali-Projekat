import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../model/country.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() country: Country = {} as Country;
  @Input() numberOfSelectedCards = 0;
  @Input() isSelected: boolean = false;

  constructor(private router: Router) {}

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
    this.router.navigate(['details']);
  }
}
