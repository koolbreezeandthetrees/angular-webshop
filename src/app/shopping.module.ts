//shopping.module.ts
import { NgModule } from '@angular/core';
import {ProductsComponent} from "./shopping/components/products/products.component";
import {ShoppingCartComponent} from "./shopping/components/shopping-cart/shopping-cart.component";
import {CheckOutComponent} from "./shopping/components/check-out/check-out.component";
import {OrderSuccessComponent} from "./shopping/components/order-success/order-success.component";
import {MyOrdersComponent} from "./shopping/components/my-orders/my-orders.component";
import {ProductFilterComponent} from "./shopping/components/products/product-filter/product-filter.component";
import {
  ShoppingCartSummaryComponent
} from "./shopping/components/shopping-cart-summary/shopping-cart-summary.component";
import {ShippingFormComponent} from "./shopping/components/shipping-form/shipping-form.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "./shared.module";



@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'check-out', component: CheckOutComponent},
      {path: 'order-success/:id', component: OrderSuccessComponent},
      {path: 'my/orders', component: MyOrdersComponent},
    ])
  ]
})
export class ShoppingModule { }
