import {Product} from "./product";

export interface ShoppingCartItem {
    product: Product;
    title: string;
    quantity: number;
}
