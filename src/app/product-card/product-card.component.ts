//product-card.component.ts
import {Component, Input} from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping/shopping-cart.service';
import { ShoppingCart } from "../models/shopping-cart";

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
    @Input('product') product: Product | undefined;
    @Input('show-actions') showActions = true;
    @Input('shopping-cart') shoppingCart: ShoppingCart | undefined;

    constructor(private cartService: ShoppingCartService) {}

    addToCart(): void {
        if (this.product && this.product.$key) {
            this.cartService.addToCart(this.product.$key);
        } else {
            console.error('Product ID is undefined');
        }
    }


    getQuantity(): number {
        return this.shoppingCart?.getQuantity(<Product>this.product) || 0;
    }
}
