//product.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
    // Use snapshotChanges() to get both data and metadata
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.val();
          const $key = action.key as string;
          return { $key, ...(data as object) };
        }))
      );
  }

  getProduct(productId: string): Observable<unknown | null> {
    return this.db.object('/products/' + productId).valueChanges();
  }

  // use this method to update the product in the database
  updateProduct(productId: string, product: Object) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }

  getProductTitle(productId: string): Observable<string> {
    console.log('Fetching product title for productId:', productId);
    return this.getProduct(productId)
        .pipe(
            map((product: any) => {
              console.log('Product details:', product);
              return product ? product.title : '';
            })
        );
  }
}
