import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountryDetailsInfoComponent } from './components/country-details-info/country-details-info.component';
import { CountryDetailsItemComponent } from './components/country-details-item/country-details-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailsComponent,
    CountryDetailsInfoComponent,
    CountryDetailsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
