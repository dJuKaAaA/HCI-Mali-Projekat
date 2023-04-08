import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() flag: string = '';
  @Input() name: string = '';
  @Input() capitalCity: string = '';
  @Input() continents: string[] = [];
  @Input() population: number = 0;
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
}
