// shopping-cart.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {BehaviorSubject, filter, Observable, take} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ShoppingCart} from "../../models/shopping-cart";
import {ProductService} from "../products/product.service";

@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    private readonly cartIdKey = 'cartId';
  private cartSubject = new BehaviorSubject<ShoppingCart>(new ShoppingCart({}));

    constructor(private db: AngularFireDatabase, private productService: ProductService) {}


  getCart(): Observable<ShoppingCart> {
    const cartId = this.getOrCreateCartId();

    this.db
      .object<{ items?: { [productId: string]: any } }>(`/shopping-carts/${cartId}`)
      .valueChanges()
      .pipe(
        filter((cart) => cart !== null),
        map((cart) => new ShoppingCart(cart?.items || {}))
      )
      .subscribe((cart) => {
        // Update the BehaviorSubject when the cart changes
        this.cartSubject.next(cart);
      });

    return this.cartSubject.asObservable();
  }
    addToCart(productId: string | undefined): void {
        this.updateCartItem(productId, 1);
    }
    removeFromCart(productId: string | undefined): void {
        this.updateCartItem(productId, -1);
    }


  async clearCart(): Promise<void> {
    let cartId = this.getOrCreateCartId();
    await this.db.object(`/shopping-carts/${cartId}/items`).remove();

    // Emit an empty cart to subscribers after clearing
    this.cartSubject.next(new ShoppingCart({}));

    console.log('cart cleared');
  }


    private updateCartItem(productId: string | undefined, change: number): void {
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }

        const cartId = this.getOrCreateCartId();
        const cartItemRef = this.db.object(`/shopping-carts/${cartId}/items/${productId}`);

        cartItemRef.valueChanges()
            .pipe(
                take(1),
                switchMap((cartItem: any) => {
                    const quantity = (cartItem?.quantity || 0) + change;

                    // Fetch the product details, including the price
                    return this.productService.getProduct(productId).pipe(
                        take(1),
                        switchMap((product: any) => {
                            const price = product ? product.price : 0;
                            const title = product ? product.title : '';
                            const id = product ? product.id : '';

                            // Create an object with the product details including the reference to the product node
                            const updatedCartItem = {
                                product: { id: productId, ...product }, // Store the reference to the product node
                                quantity,
                                title,
                                price,

                            };

                            // Update or remove the cart item
                            if (quantity > 0) {
                                return cartItemRef.update(updatedCartItem);
                            } else {
                                return cartItemRef.remove();
                            }
                        })
                    );
                })
            )
            .subscribe(() => {}, () => {});
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
