import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Food } from '../model/food';
import { FoodserviceapiService } from '../services/foodserviceapi.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Output() categorySelected = new EventEmitter<string>();

  allCategories: string[] = [];
  shuffledCategories: string[] = [];
  selectedCategory: string | null = null;
  filteredItems: Food[] = [];
  allfood: Food[] = [];
  food: string[] = []; 

  constructor(private foodservice: FoodserviceapiService) {}

  ngOnInit(): void {
    this.foodservice.getFood().subscribe((data: any) => {
      // API gives an array of meals
      this.allfood = data.meals.map((meal: any) => ({
        name: meal.strMeal,
        category: meal.strCategory,
        image: meal.strMealThumb,
        price: 100 // example price
      }));

      // extract unique categories
      const categories = this.allfood.map(f => f.category);
      this.allCategories = Array.from(new Set(categories));

      // Shuffle categories randomly
      this.shuffledCategories = [...this.allCategories].sort(() => Math.random() - 0.5);

      // Show only 10 categories
      this.food = this.shuffledCategories.slice(0, 10);
    });
  }

  onCategoryClick(category: string){
     if (this.selectedCategory === category) {
    // If clicking again, remove selection
    this.selectedCategory = null;
    this.categorySelected.emit(''); 
    return; // send empty to reset
  }
    // Normal selection
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}
