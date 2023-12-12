// shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart> | undefined;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.cart$ = this.shoppingCartService.getCart();
  }

  async clearCart(): Promise<void> {
    await this.shoppingCartService.clearCart();
  }
}
