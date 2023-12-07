// shopping-cart.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    private readonly CART_ID_KEY = 'cartId';

    constructor(private db: AngularFireDatabase) {}

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
            map((cartItem: any) => {
                const quantity = (cartItem?.quantity || 0) + change;
                if (quantity > 0) {
                    return cartItemRef.update({ product: productId, quantity });
                } else {
                    return cartItemRef.remove();
                }
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
        let cartId = localStorage.getItem(this.CART_ID_KEY);

        if (!cartId) {
            cartId = this.generateCartId();
            localStorage.setItem(this.CART_ID_KEY, cartId);
        }

        return cartId;
    }
}
