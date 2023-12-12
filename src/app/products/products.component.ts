// product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../services/products/product.service';
import { ShoppingCart } from '../models/shopping-cart';
import {ShoppingCartService} from "../services/shopping/shopping-cart.service"; // Import the ShoppingCart model

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string | null = null;
    shoppingCart: ShoppingCart | undefined;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private shoppingCartService: ShoppingCartService // Import and inject the ShoppingCartService
    ) {}

    ngOnInit() {
        // Initialize the shoppingCart property
        this.shoppingCartService.getCart().subscribe(cart => {
            this.shoppingCart = cart;
        });

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
