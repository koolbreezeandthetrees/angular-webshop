// shopping-cart.ts
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    constructor(public items: { [productId: string]: ShoppingCartItem }) {}

    get productIds() {
        return Object.keys(this.items);
    }

    get totalItemsCount(): number {
        return Object.values(this.items || {}).reduce((count, item) => count + item.quantity, 0);
    }

}
