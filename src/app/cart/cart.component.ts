import { Component, OnInit, ViewChild } from '@angular/core';
import { Food } from '../model/food';
import { CartservicesService } from '../services/cartservices.service';
import { QuantityService } from '../services/quantity.service';
import { PopupComponent } from '../popup/popup.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild(PopupComponent) popup!: PopupComponent;

  cartitem: Food[] = [];
  selectedOne?: Food;
  totalprice: number = 0;
  count: number = 0;
  price: number=100;
  
  constructor(
    public cartservice: CartservicesService,
    private cartCountService: QuantityService
  ) {}

  ngOnInit() {

    this.cartitem = this.cartservice.getcartitem();

    // Subscribe to total price updates
    this.cartservice.totalPrice$.subscribe(price => {
      this.totalprice = price;
    });

    // Subscribe to item count updates
    this.cartCountService.itemCount$.subscribe(c => this.count = c);
  }

  // Add item to cart (with quantity)
  addcart(item: Food) {
    const existing = this.cartitem.find(f => f.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      item.quantity = 1;
      this.cartitem.push(item);
    }


    this.cartservice.updatedtotal();
    const totalCount = this.cartitem.reduce((sum, f) => sum + (f.quantity || 1), 0);
    this.cartCountService.setCount(totalCount);
  }

  
  cancelbutton(index: number) {
    this.cartservice.removecartitem(index);
    this.cartitem = this.cartservice.getcartitem();
  }

  clearitem() {
    this.cartitem.length = 0;
    this.cartservice.updatedtotal();
    this.cartCountService.setCount(0);
  }

  orderbutton(item: Food) {
    // this.popup.openPopup();
    this.cartservice.setformPrice(item.price* (item.quantity || 1))
  }

  orderall() {
    // this.popup.orderAllpopup();
    this.cartservice.setformPrice(this.totalprice)
  }
}
