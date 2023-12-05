// product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from "../../services/products/category.service";
import { Observable, take } from 'rxjs';
import { ProductService } from "../../services/products/product.service";
import { MyValidators } from "../../common/validators/product.validators";
import { ActivatedRoute, Router } from "@angular/router";
import {Category} from "../../models/category";

interface PriceErrors {
  required?: string;
  invalidPrice?: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  categories$!: Observable<Category[]>;
  product: any = {};
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.priceValidator]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, MyValidators.imageUrlValidator]],
    });

    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProduct(productId).pipe(take(1)).subscribe((product) => {
          this.product = product;
          this.product.id = productId; // Set the id property
          this.form.patchValue(product as { [key: string]: any });
        });
      }
    });

    // Subscribe to form value changes to update the product preview
    this.form.valueChanges.subscribe((value) => {
      this.product = value;
    });
  }


  private updateFormControls() {
    this.titleControl?.setValue(this.product.title);
    this.priceControl?.setValue(this.product.price);
    this.categoryControl?.setValue(this.product.category);
    this.imageUrlControl?.setValue(this.product.imageUrl);
  }

  save() {
    if (this.form.valid) {
      const product = this.form.value;

      if (this.product && this.product.id) {
        this.productService.updateProduct(this.product.id, product).then(() => {
          this.router.navigate(['/admin/products']).then(r => console.log(r));
        });
      } else {
        this.productService.create(product).then(() => {
          this.router.navigate(['/admin/products']).then(r => console.log(r));
        });
      }
    }
  }


  get titleControl() {
    return this.form.get('title');
  }

  get priceControl() {
    return this.form.get('price');
  }

  get categoryControl() {
    return this.form.get('category');
  }

  get imageUrlControl() {
    return this.form.get('imageUrl');
  }

  delete() {
    if (!this.id) {
      console.error('Product ID not available for delete operation.');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id).then(r => console.log(r));
      this.router.navigate(['/admin/products']).then(r => console.log(r));
    }
  }
}


