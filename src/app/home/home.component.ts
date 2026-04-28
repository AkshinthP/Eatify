import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food';
import { FoodserviceapiService } from '../services/foodserviceapi.service';
import { ActivatedRoute } from '@angular/router';
import { CartservicesService } from '../services/cartservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  food :Food[]=[];
  searchTerm:string='';
  searched:boolean=false;
  allfood:Food[]=[];
  categories: string[] = [];
  selectedCategory: string | null = null;

  constructor(
    private foodservice: FoodserviceapiService,
    private route: ActivatedRoute,
    private cartservice: CartservicesService
  ){}

  ngOnInit() {
 this.foodservice.getFood().subscribe((data: any) => {
      this.allfood = data.meals.map((meal: any) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        imageUrl: meal.strMealThumb,
        area: meal.strArea,
        instructions: meal.strInstructions,
        category: meal.strCategory
      }));
      // this.allfood= data.meals
      // console.log(this.food);
      

      //  for unique categories
      const allCats = this.allfood.map(fd => fd.category);
      this.categories = Array.from(new Set(allCats))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      this.food = [...this.allfood].slice(0, 10); // show default items
      console.log(data);     //all data console kittan
      
    });

    // Listen to search query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
      if (this.searchTerm) {
        this.searched = true;
        this.food = this.allfood.filter(fd =>
          fd.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.searched = false;
        this.food = [...this.allfood].slice(0, 10); // reset to default items
      }
    });
  
  

    this.route.queryParams.subscribe(params => {
      const term = params['searchTerm'];
      if (term && term.trim()) {
        this.food = this.allfood.filter(fd =>
          fd.name.toLowerCase().includes(term.toLowerCase())
        );
      }
      else{
        this.food = [...this.allfood]
          // .sort(() => 0.5 - Math.random())
          .slice(0, 10);
      }
    });

}
  seachClick(value: string){
    console.log(value);
    this.searched = true;
    this.food = this.allfood.filter(fd =>
      fd.name.toLowerCase().includes(value.toLowerCase())
    );
    
   }

   toggletocart(item: Food){
    if(item){
      this.cartservice.addtocart(item)
      // alert(item.name)
    }
   }

   isInCart(item: Food): boolean {
      return this.cartservice.isInCart(item);
  }

  // onCategoryClick(category: string) {
  //   this.selectedCategory = category;
  //   this.searchTerm = '';
  //   this.food = this.allfood.filter(fd => fd.category === category);
  // }

  onCategoryClick(category: string){
    if (category === '') {
    this.selectedCategory = null;
    this.searchTerm = '';
    this.food = this.allfood.slice(0, 10); // OR show all data
    return;
  }

  // Otherwise: select category normally
  this.selectedCategory = category;
  this.searchTerm = '';
  this.food = this.allfood.filter(fd => fd.category === category);
  
  }
}