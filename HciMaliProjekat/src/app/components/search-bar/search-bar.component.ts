import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  borderWidth:String = "1px";
  activeFilter:string = "";


  highlight(){
    this.borderWidth = "2px"
  }

  deHighlight(){
    this.borderWidth = "1px"
  }

  onSubmit(f: NgForm){
  }

  changeActiveFilter(continent:string){
    if(this.activeFilter == continent){
      this.activeFilter = ""
    }else{
      this.activeFilter = continent;
    }
  }


}
