// shopping-cart.ts
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    constructor(public items: { [productId: string]: ShoppingCartItem }) {}

    // shopping-cart.ts
    get totalItemsCount(): number {
        return Object.values(this.items || {}).reduce((count, item) => count + item.quantity, 0);
    }

}
