import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../services/user-access/auth.service";
import {OrderService} from "../services/checkout/order.service";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{
  @Input('cart') cart: any = {};
  shipping: any = {}; // Initialize as an object
  userSubscription: Subscription | undefined;
  userId: string | undefined;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }


  async placeOrder() {
    let order = new Order(this.userId || 'defaultUserId', this.shipping!, this.cart!);
    let result = await this.orderService.placeOrder(order);
    await this.router.navigate(['/order-success', result.key]);
  }

}
