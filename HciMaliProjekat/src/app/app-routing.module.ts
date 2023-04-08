import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryService } from './service/country.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CountryService],
})
export class AppRoutingModule {}
