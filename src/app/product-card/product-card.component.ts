// product-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping/shopping-cart.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    @Input('product') product: Product | undefined;
    @Input('show-actions') showActions = true;
    cartQuantity: number = 0;

    constructor(private cartService: ShoppingCartService) {}

    ngOnInit() {
        // Subscribe to changes in the cart items to update cart quantity
        this.cartService.getCartItems().subscribe((cartItems) => {
            const cartItem = cartItems.find((item) => item.product.id === this.product?.$key);
            this.cartQuantity = cartItem?.quantity || 0;
        });
    }

    addToCart(): void {
        if (this.product?.$key) {
            this.cartService.addToCart(this.product.$key);
        } else {
            console.error('Product ID is undefined');
        }
    }

    removeFromCart(): void {
        if (this.product?.$key) {
            this.cartService.removeFromCart(this.product.$key);
        } else {
            console.error('Product ID is undefined');
        }
    }

    getQuantity(): number {
        return this.cartQuantity;
    }
}
