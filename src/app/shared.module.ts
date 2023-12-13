//shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "@shared/components/product-card/product-card.component";
import {ProductQuantityComponent} from "@shared/components/product-quantity/product-quantity.component";
import {AuthService} from "@shared/services/auth/auth.service";
import {AuthGuard} from "@shared/services/auth/auth-guard.service";
import {UserService} from "@shared/services/auth/user.service";
import {CategoryService} from "@shared/services/product/category.service";
import {ProductService} from "@shared/services/product/product.service";
import {ShoppingCartService} from "@shared/services/order/shopping-cart.service";
import {OrderService} from "@shared/services/order/order.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,

  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]

})
export class SharedModule { }
