import { Component } from '@angular/core';
import { CategoryService } from "../../services/products/category.service";
import { Observable } from 'rxjs';
import { AngularFireList } from "@angular/fire/compat/database";
import {ProductService} from "../../services/products/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<any[]>;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories().snapshotChanges(); //getCategories() returns an AngularFireList, not an observable. You should use the .snapshotChanges() method to convert it into an observable.
  }

  save(product:any) {
    this.productService.create(product);
  }
}
