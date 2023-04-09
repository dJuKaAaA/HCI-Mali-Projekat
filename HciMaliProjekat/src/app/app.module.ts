import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountryDetailsInfoComponent } from './components/country-details-info/country-details-info.component';
import { CountryDetailsItemComponent } from './components/country-details-item/country-details-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent
    CountryDetailsComponent,
    CountryDetailsInfoComponent,
    CountryDetailsItemComponent,
    CardComponent,
    CardsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
