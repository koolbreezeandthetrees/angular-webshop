//product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../models/product';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('category');
          return this.productService.getAll();
        })
      )
      .subscribe((products: Product[]) => {
        this.products = products;
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });

  }

}

/*

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/products/category.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$: Observable<Category[]> | undefined;
  category: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('category');
          return this.productService.getAll();
        })
      )
      .subscribe((products: Product[]) => {
        this.products = products;
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });

    this.categories$ = this.categoryService.getAll();
  }

}

*/
