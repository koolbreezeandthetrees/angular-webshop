// admin-product.component.ts
import {Component, OnDestroy} from '@angular/core';
import { ProductService } from "../../services/products/product.service";
import { Subscription} from 'rxjs';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnDestroy {
 products: {title: string}[] = [];
 filteredProducts: any[] = [];
 subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts =  this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query)  ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
