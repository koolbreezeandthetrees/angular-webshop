import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DataTablesModule} from "angular-datatables";


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';


import {AuthService} from "./services/user-access/auth.service";
import {AuthGuard} from "./services/user-access/auth-guard.service";
import {UserService} from "./services/user-access/user.service";
import {AdminAuthGuard} from "./services/user-access/admin-auth-guard.service";
import {CategoryService} from "./services/products/category.service";
import {ProductService} from "./services/products/product.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from "./material/material.module";
import {MatSortModule} from "@angular/material/sort";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {ShoppingCartService} from "./services/shopping/shopping-cart.service";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {OrderService} from "./services/checkout/order.service";
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';



const firebaseConfig = {
  apiKey: "AIzaSyBn_Sr6bL8ICNkSYn3ZgfSJnHc4U75rs3U",
  authDomain: "webshop-2fd3e.firebaseapp.com",
  databaseURL: "https://webshop-2fd3e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-2fd3e",
  storageBucket: "webshop-2fd3e.appspot.com",
  messagingSenderId: "993741169575",
  appId: "1:993741169575:web:b05fb32f4e711c42934c82",
  measurementId: "G-FWWTB298PL"
}


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
   ProductsComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    HomeComponent,
    CheckOutComponent,
    NavbarComponent,
    AdminOrdersComponent,
    AdminProductComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([

      //routes for anonymous users
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},

      //routes for logged-in users
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},

      //routes for admin users
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSortModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
