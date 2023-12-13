import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "@shared/models/category";
import {CategoryService} from "@shared/services/product/category.service";

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent {
  categories$: Observable<Category[]> | undefined;
  @Input('category') category : string | null = null;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }


}
