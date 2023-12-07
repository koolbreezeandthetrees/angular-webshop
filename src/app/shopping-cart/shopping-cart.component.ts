//shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../services/shopping/shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "../models/shopping-cart";
import { ProductService } from "../services/products/product.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart> | undefined;

  constructor(
      private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    console.log('Initializing shopping cart component');
    this.cart$ = this.shoppingCartService.getCart();
  }
}
