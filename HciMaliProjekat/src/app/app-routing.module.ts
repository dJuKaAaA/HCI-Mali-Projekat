import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CountryService } from './service/country.service';
import { CountryDetailsComponent } from './components/country-details/country-details.component';


const routes: Routes = [
  {
    path: 'details',
    component: CountryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CountryService],
})
export class AppRoutingModule {}
