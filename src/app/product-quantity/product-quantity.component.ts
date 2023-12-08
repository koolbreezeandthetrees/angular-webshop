//product-quantity.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping/shopping-cart.service';
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product | undefined;
  @Input('shopping-cart') shoppingCart: ShoppingCart | undefined;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(): void {
    if (this.product && this.product.$key) {
      this.cartService.addToCart(this.product.$key);
    } else {
      console.error('Product ID is undefined');
    }
  }

  removeFromCart(): void {
    if (this.product && this.product.$key) {
      this.cartService.removeFromCart(this.product.$key);
    } else {
      console.error('Product ID is undefined');
    }
  }

  getQuantity(): number {
    return this.shoppingCart?.getQuantity(<Product>this.product) || 0;
  }
}
