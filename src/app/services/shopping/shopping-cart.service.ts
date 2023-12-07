// shopping-cart.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {filter, forkJoin, Observable, take} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ShoppingCart} from "../../models/shopping-cart";
import {ProductService} from "../products/product.service";

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    private readonly cartIdKey = 'cartId';

    constructor(private db: AngularFireDatabase, private productService: ProductService) {}

    // shopping-cart.service.ts
    getCart(): Observable<ShoppingCart> {
        const cartId = this.getOrCreateCartId();

        return this.db
            .object<{ items?: { [productId: string]: any } }>(`/shopping-carts/${cartId}`)
            .valueChanges()
            .pipe(
                filter(cart => cart !== null),
                map(cart => new ShoppingCart(cart?.items || {}))
            );
    }

    addToCart(productId: string | undefined): void {
        this.updateCartItem(productId, 1);
    }

    removeFromCart(productId: string | undefined): void {
        this.updateCartItem(productId, -1);
    }

    private updateCartItem(productId: string | undefined, change: number): void {
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }

        const cartId = this.getOrCreateCartId();
        const cartItemRef = this.db.object(`/shopping-carts/${cartId}/items/${productId}`);

        cartItemRef.valueChanges().pipe(
            take(1),
            switchMap((cartItem: any) => {
                const quantity = (cartItem?.quantity || 0) + change;

                // Fetch the product title
                return this.productService.getProductTitle(productId).pipe(
                    take(1),
                    switchMap(title => {
                        // Update or remove the cart item
                        if (quantity > 0) {
                            return cartItemRef.update({ product: productId, quantity, title });
                        } else {
                            return cartItemRef.remove();
                        }
                    })
                );
            })
        ).subscribe(() => {}, () => {});
    }


    getCartItems(): Observable<any[]> {
        const cartId = this.getOrCreateCartId();
        return this.db.list(`/shopping-carts/${cartId}/items`).valueChanges();
    }

    private generateCartId(): string {
        return 'cart_' + Math.random().toString(36).substr(2, 9);
    }

    getOrCreateCartId(): string {
        let cartId = localStorage.getItem(this.cartIdKey);

        if (!cartId) {
            cartId = this.generateCartId();
            localStorage.setItem(this.cartIdKey, cartId);
        }

        return cartId;
    }


}
