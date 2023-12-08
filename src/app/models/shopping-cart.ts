// shopping-cart.ts
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalItemsCount(): number {
        return Object.values(this.items || {}).reduce((count, item) => count + item.quantity, 0);
    }

    get totalPrice(): number {
        let sum = 0;
        for(let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum; // Move this line outside of the loop
    }

}
