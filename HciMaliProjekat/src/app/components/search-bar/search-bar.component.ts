import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, count, map, startWith } from 'rxjs';
import { Country } from 'src/app/model/country.model';

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
    setTimeout(() =>{
      this.filteredCountries = this.countries;
      this.fillUpArrays(this.countries);
      this.addAutoComplete();
    }, 500)
  }

  ngOnChanges(){
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

  fillUpArrays(selectedCountries:Country[]){
    let allNames:string[] = []
    let allCurrency:string[] = []
    let allCapitalCities:string[] = []
    let allContinents:string[] = []
    for(let country of selectedCountries){
      if(country.name != undefined)
        this.checkIfAlreadyAdded(allNames, country.name.toString());
      if(country.capitalCity!=undefined)
        this.checkIfAlreadyAdded(allCapitalCities, country.capitalCity.toString());
      for(let currency of country.currencies)
        this.checkIfAlreadyAdded(allCurrency, currency.toString());
      for(let continent of country.continents)
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


  onSubmit(){
    let value = this.control.getRawValue();

    if(value == ""){
      this.filtered.emit(this.countries);
      return;
    }

    let selectedCountries:Country[] = []
    for(let country of this.filteredCountries){
      let name = this._normalizeValue(country.name.toString());
      let capitalCity = this._normalizeValue(country.capitalCity.toString());
      let continents:string[] = []
      let currencies:string[] = []
      for(let continent of country.continents){
        continents.push(this._normalizeValue(country.continents.toString()));
      }
      for(let currency of country.currencies){
        currencies.push(this._normalizeValue(currency.toString()))
      }
      
      if(this.searchBy == "name" && name.includes(value?.toLowerCase()!)){
        selectedCountries.push(country);
      }else if(this.searchBy == "continent"){
        for(let continent of continents){
          if(continent.includes(value?.toLowerCase()!))
            selectedCountries.push(country);
        }
      }else if(this.searchBy == "currency"){
        for(let currency of currencies){
          if(currency.includes(value?.toLowerCase()!))
            selectedCountries.push(country);
        }
      }else if(this.searchBy == "capitalCity" && capitalCity.includes(value?.toLowerCase()!)){
        selectedCountries.push(country);
      }
    }
    console.log(selectedCountries);
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
    this.onSubmit();
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
      for(let con of country.continents)
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
