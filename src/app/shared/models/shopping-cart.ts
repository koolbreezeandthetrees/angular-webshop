// shopping-cart.ts
import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem } = {}) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    getQuantity(product: Product ){
        if (this.itemsMap && product.id) {
            let item = this.itemsMap[product.id];
            return item ? item.quantity : 0;
        }
        return 0;
    }

    get totalItemsCount(): number {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    get totalPrice(): number {
        return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
}
