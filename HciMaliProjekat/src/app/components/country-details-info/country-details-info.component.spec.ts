import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailsInfoComponent } from './country-details-info.component';

describe('CountryDetailsInfoComponent', () => {
  let component: CountryDetailsInfoComponent;
  let fixture: ComponentFixture<CountryDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDetailsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
