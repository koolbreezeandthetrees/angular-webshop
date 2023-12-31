//product-quantity.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '@shared/models/product';
import { ShoppingCartService } from '../../services/order/shopping-cart.service';
import { ShoppingCart } from "@shared/models/shopping-cart";

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
    if (this.product && this.product.id) {
      this.cartService.addToCart(this.product.id);
    } else {
      console.error('Product ID is undefined');
    }
  }

  removeFromCart(): void {
    if (this.product && this.product.id) {
      this.cartService.removeFromCart(this.product.id);
    } else {
      console.error('Product ID is undefined');
    }
  }

  getQuantity(): number {
    return this.shoppingCart?.getQuantity(<Product>this.product) || 0;
  }
}
