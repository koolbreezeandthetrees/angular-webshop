import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {UserService} from "./services/user.service";
import {AdminAuthGuard} from "./services/admin-auth-guard.service";


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';



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
    AdminProductComponent
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
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},

      //routes for admin users
      {path: 'admin/products', component: AdminProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},

    ]),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
