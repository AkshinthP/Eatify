import { Injectable } from '@angular/core';
import { Food } from '../model/food';
import { BehaviorSubject } from 'rxjs';
import { QuantityService } from './quantity.service';

@Injectable({
  providedIn: 'root'
})
export class CartservicesService {

  constructor(
    private cartCountService: QuantityService
  ) { }

  private cartitem: Food[] = [];

  // Observable for total price
  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  // Observable for cart items
  private cartItemsSubject = new BehaviorSubject<Food[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  //for form auto price
  private formPriceSubject = new BehaviorSubject<number>(0);
  formPrice$ = this.formPriceSubject.asObservable();

  // Get current cart items
  getcartitem(): Food[] {
    return this.cartitem;
  }

  // Add item to cart (with quantity)
  addtocart(item: Food) {
    const index = this.cartitem.findIndex(f => f.id === item.id);

    if (index === -1) {
      // Add new item
      item.price = 100;
      item.quantity = 1;
      this.cartitem.push(item);
    } else {
      // Remove item if already exists
      this.cartitem.splice(index, 1);
    }

    this.updatedtotal();
    const totalCount = this.cartitem.reduce((sum, f) => sum + (f.quantity || 1), 0);
    this.cartCountService.setCount(totalCount);
    this.cartItemsSubject.next(this.cartitem);
  }

  // Remove item by index
  removecartitem(index: number) {
    this.cartitem.splice(index, 1);
    this.updatedtotal();
    this.cartCountService.setCount(this.cartitem.length);
    this.cartItemsSubject.next(this.cartitem);
  }

  // Update item quantity
  updateItemQuantity(item: Food, newQuantity: number) {
    const cartItem = this.cartitem.find(f => f.id === item.id);
    if (cartItem && newQuantity >= 1) {
      cartItem.quantity = newQuantity;
      this.updatedtotal();

      // update cart count (sum of all quantities)
      const totalCount = this.cartitem.reduce((sum, f) => sum + (f.quantity || 1), 0);
      this.cartCountService.setCount(totalCount);
      this.cartItemsSubject.next(this.cartitem);
    }
  }

  // Recalculate total price
  updatedtotal() {
    const total = this.cartitem.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    this.totalPriceSubject.next(total);
  }

  // Check if item is in cart
  isInCart(item: Food): boolean {
    return this.cartitem.some(f => f.id === item.id);
  }

  setformPrice( price: number){
    this.formPriceSubject.next(price)
  }
}
