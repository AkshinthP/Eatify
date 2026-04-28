import { Component, inject, OnInit } from '@angular/core';
import { FoodserviceapiService } from '../services/foodserviceapi.service';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { QuantityService } from '../services/quantity.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent  {

  searchTerm: string = '';
  router: Router = inject(Router);
  searchCl: boolean=false

  constructor(private foodservice: FoodserviceapiService,
              private quantity: QuantityService
  ){}

  searchClick() {
    // Only navigate if search term exists
    this.searchCl=true
    if (this.searchTerm.trim()) {
      this.router.navigate(['/'], { queryParams: { searchTerm: this.searchTerm }, fragment: 'search-results' });
    }
    
  }

  // ngOnInit(): void {
  //   submitForm(){

  //   }
  // }
}

