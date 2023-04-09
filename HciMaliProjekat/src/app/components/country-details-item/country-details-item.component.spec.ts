import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailsItemComponent } from './country-details-item.component';

describe('CountryDetailsItemComponent', () => {
  let component: CountryDetailsItemComponent;
  let fixture: ComponentFixture<CountryDetailsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDetailsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
