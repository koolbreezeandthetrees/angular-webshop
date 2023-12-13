//admin.module.ts
import { NgModule } from '@angular/core';
import {AdminOrdersComponent} from "./admin/components/admin-orders/admin-orders.component";
import {AdminProductComponent} from "./admin/components/admin-product/admin-product.component";
import {ProductFormComponent} from "./admin/components/product-form/product-form.component";

import {AdminAuthGuard} from "./admin/services/admin-auth-guard.service";
import {SharedModule} from "./shared.module";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./material/material.module";




@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AdminAuthGuard]},
    ])

  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
