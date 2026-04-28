import { Component, inject, OnInit } from '@angular/core';
import { FoodserviceapiService } from '../services/foodserviceapi.service';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../model/food';
import { CartservicesService } from '../services/cartservices.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.scss']
})
export class SelectedItemComponent implements OnInit {

  food :Food[]=[];
    searchTerm:string='';
    searched:boolean=false;
    allfood:Food[]=[];
    selectedFood?: Food

      private location = inject(Location);


  constructor(
    private foodservice: FoodserviceapiService,
    private route: ActivatedRoute,
    private cartservice: CartservicesService
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')!;
  this.foodservice.getFood().subscribe((data: any) => {
    const allfood = data.meals.map((meal: any) => ({
      imageUrl: meal.strMealThumb,
      id: meal.idMeal,
      name: meal.strMeal,
      area: meal.strArea,
      instructions: meal.strInstructions,
      category: meal.strCategory
    }));

    this.selectedFood = allfood.find((item: Food) => item.id === id);
    window.scrollTo(0, 0);    // page navigate chayyumbol page nte top show chayyn 
  });
}

addtocart(){
    if(this.selectedFood){
      this.cartservice.addtocart(this.selectedFood);
    }
  }

  isAdded(): boolean {
    return this.selectedFood ? this.cartservice.isInCart(this.selectedFood) : false;
  }

  goback(){
    this.location.back();
  }
}
