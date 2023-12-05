import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from "../../services/products/product.service";
import { Subscription } from 'rxjs';
import { Product } from "../../models/product";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription!: Subscription;
  displayedColumns: string[] = ['title', 'price', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Product>([]);
  originalData: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.originalData = products;
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
      });
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }

  createFilter(): (data: Product, filter: string) => boolean {
    const filterFunction = (data: Product, filter: string): boolean => {
      return data.title.toLowerCase().includes(filter);
    };
    return filterFunction;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



// import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { ProductService } from "../../services/products/product.service";
// import { Subscription } from 'rxjs';
// import { Product } from "../../models/product";
//
// @Component({
//   selector: 'app-admin-product',
//   templateUrl: './admin-product.component.html',
//   styleUrls: ['./admin-product.component.css']
// })
// export class AdminProductComponent implements OnInit, OnDestroy {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   subscription!: Subscription;
//   displayedColumns: string[] = ['title', 'price', 'edit'];
//
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//
//   dataSource = new MatTableDataSource<Product>([]);
//
//   constructor(private productService: ProductService) { }
//
//   ngOnInit() {
//     this.subscription = this.productService.getAll()
//       .subscribe(products => {
//         this.filteredProducts = this.products = products;
//         this.dataSource = new MatTableDataSource(products);
//         this.dataSource.sort = this.sort;
//         this.dataSource.paginator = this.paginator;
//       });
//   }
//
//   filter(query: string) {
//     this.filteredProducts = (query) ?
//       this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
//       this.products;
//     this.dataSource.data = this.filteredProducts; // Update MatTableDataSource
//   }
//
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }


// // admin-product.component.ts
// import {Component, OnDestroy} from '@angular/core';
// import { ProductService } from "../../services/products/product.service";
// import { Subscription} from 'rxjs';
// import {Product} from "../../models/product";
//
//
// @Component({
//   selector: 'app-admin-product',
//   templateUrl: './admin-product.component.html',
//   styleUrls: ['./admin-product.component.css']
// })
// export class AdminProductComponent implements OnDestroy {
//  products: Product[] = [];
//  filteredProducts: any[] = [];
//  subscription: Subscription;
//  displayedColumns: string[] = ['title', 'price', 'edit'];
//
//   constructor(private productService: ProductService) {
//     this.subscription = this.productService.getAll()
//       .subscribe(products => this.filteredProducts =  this.products = products);
//   }
//
//   filter(query: string) {
//     this.filteredProducts = (query)  ?
//       this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
//       this.products;
//   }
//
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
//
// }
