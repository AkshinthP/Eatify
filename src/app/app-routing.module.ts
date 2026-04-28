import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SelectedItemComponent } from './selected-item/selected-item.component';
import { CategoryComponent } from './category/category.component';
import { FormComponent } from './cart/form/form.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'search/searchTerm', component: HomeComponent},
  {path: 'selectditem/:id', component: SelectedItemComponent},
  {path: 'back', component: HomeComponent},
  {path: 'form', component: FormComponent}
];

const routerOptions: ExtraOptions = {             // navigate chayyumbo page nte apozhum topil show chayyan vandi
  scrollPositionRestoration: 'enabled', // <-- restores scroll to top
  anchorScrolling: 'enabled',           // optional, for anchor links
};

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled',   // ✅ enables fragment scrolling
      scrollOffset: [0, 0] 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
