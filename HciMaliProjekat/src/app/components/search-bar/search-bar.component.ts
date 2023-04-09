import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, count, map, startWith } from 'rxjs';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  borderWidth:String = "1px";
  activeFilter = "";
  searchBy: string = "name";
  autofillDisplay: string = "none";
  @Input() countries : Country[] = []; 
  @Output() filtered: EventEmitter<Country[]> = new EventEmitter();

  filteredCountries: Country[] = [];
  control = new FormControl('');
  options:string[] = [];
  filteredOptions!: Observable<string[]>;
  autofillOpacity:string = "0"
  filterMap:Map<string, string[]> = new Map<string,string[]>

  ngOnInit() {
    this.countries = this.makeCountries();
    this.filteredCountries = this.countries;
    this.fillUpArrays(this.countries);
    this.addAutoComplete();
  }

  addAutoComplete(){
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options.filter(option => this._normalizeValue(option).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  makeCountries():Country[]{
    let c1 = {name:"Serbia",
      currency:["Dinar"],
      capitalCity:"Belgrade",
      continent:["Europe"],
      subregion:"Balkan",
      latitude:42,
      longitude:34,
      Population:8000000,
      map:"asd",
      flag:"asd",
      crest:"asd",
      timeZone:"String",
      language:"Serbian",
      postalCode:123,
      neighbors: []}

      let c2 = {name:"Croatia",
      currency:["Euro", "Dinar"],
      capitalCity:"Zagreb",
      continent:["Europe"],
      subregion:"Balkan",
      latitude:42,
      longitude:34,
      Population:8000000,
      map:"asd",
      flag:"asd",
      crest:"asd",
      timeZone:"String",
      language: "Croatian",
      postalCode:123,
      neighbors: []}

      let c3 = {name:"Chad",
      currency:["Dinar"],
      capitalCity:"Belgrade",
      continent:["Africa"],
      subregion:"Balkan",
      latitude:42,
      longitude:34,
      Population:8000000,
      map:"asd",
      flag:"asd",
      crest:"asd",
      timeZone:"String",
      postalCode:123,
      language:"Chadski",
      neighbors: []}

    return [c1, c2, c3]
  }

  fillUpArrays(selectedCountries:Country[]){
    let allNames:string[] = []
    let allCurrency:string[] = []
    let allCapitalCities:string[] = []
    let allContinents:string[] = []
    for(let country of selectedCountries){
      this.checkIfAlreadyAdded(allNames, country.name.toString());
      this.checkIfAlreadyAdded(allCapitalCities, country.capitalCity.toString());
      for(let currency of country.currency)
        this.checkIfAlreadyAdded(allCurrency, currency.toString());
      for(let continent of country.continent)
        this.checkIfAlreadyAdded(allContinents, continent.toString());
    }
    this.filterMap.set("name", allNames);
    this.filterMap.set("currency", allCurrency);
    this.filterMap.set("capitalCity", allCapitalCities);
    this.filterMap.set("continent", allContinents);
    this.options = this.filterMap.get(this.searchBy)!;
  }

  checkIfAlreadyAdded(array:string[], word:string){
    for(let w of array){
      if(w == word)
        return
    }
    array.push(word);
  }


  onSubmit(f: NgForm){
    let value = this.control.getRawValue();

    if(value == ""){
      this.filtered.emit(this.countries);
      return;
    }

    let selectedCountries:Country[] = []
    console.log(this.searchBy)
    for(let country of this.filteredCountries){
      if(this.searchBy == "name" && country.name.toLowerCase().includes(value?.toLowerCase()!)){
        selectedCountries.push(country);
      }else if(this.searchBy == "continent"){
        for(let continent of country.continent){
          if(continent.toLowerCase().includes(value?.toLowerCase()!))
            selectedCountries.push(country);
        }
      }else if(this.searchBy == "currency"){
        for(let currency of country.currency){
          if(currency.toLowerCase().includes(value?.toLowerCase()!))
            selectedCountries.push(country);
        }
      }else if(this.searchBy == "capitalCity" && country.capitalCity.toLowerCase().includes(value?.toLowerCase()!)){
        selectedCountries.push(country);
      }
    }
    console.log(selectedCountries)
    this.filtered.emit(selectedCountries);
  }

  highlight(){
    this.autofillOpacity = "1"
    this.autofillDisplay = "block";
    this.borderWidth = "2px"
  }

  selectAutofill(option:string){
    this.autofillOpacity = "none";
    this.control.setValue(option);
  }

  deHighlight(){
    this.borderWidth = "1px"
    this.autofillOpacity = "0"
    setTimeout(()=>{
      this.autofillDisplay = "none"
    }, 300)
  }

  changeActiveFilter(continent:string){
    if(this.activeFilter == continent){
      this.activeFilter = ""
      this.filteredCountries = this.countries;
      this.fillUpArrays(this.countries);
      this.addAutoComplete();
    }else{
      this.activeFilter = continent;
      this.filterCountriesByContinent(continent);
      this.fillUpArrays(this.filteredCountries);
      this.addAutoComplete();
    }
  }

  filterCountriesByContinent(continent:string){
    this.filteredCountries = []
    for(let country of this.countries){
      for(let con of country.continent)
        if(con == continent){
          this.filteredCountries.push(country);
        }
    }
  }

  changeTheSearch(option:string){
    this.options = this.filterMap.get(option)!;
    this.searchBy = option;
    this.addAutoComplete(); 
  }
}
