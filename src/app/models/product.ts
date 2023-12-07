// product.model.ts
export interface Product {
  $key?: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  cartQuantity?: number;
}
