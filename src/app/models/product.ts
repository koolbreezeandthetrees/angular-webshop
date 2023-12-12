// product.model.ts
export interface Product {
  $key: string;
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  cartQuantity?: number;
}
