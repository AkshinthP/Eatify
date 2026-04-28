import { Component, inject, OnInit } from '@angular/core';
import { Food } from '../model/food';
import { CartservicesService } from '../services/cartservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  cartitem: Food[]=[];

  private cartservive= inject(CartservicesService)

  ngOnInit(){
    this.cartitem= this.cartservive.getcartitem();
  }
}
