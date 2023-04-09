import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountryDetailsInfoComponent } from './components/country-details-info/country-details-info.component';
import { CountryDetailsItemComponent } from './components/country-details-item/country-details-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailsComponent,
    CountryDetailsInfoComponent,
    CountryDetailsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
