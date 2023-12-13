// my-orders.component.ts

import { Component, OnInit } from '@angular/core';
import { OrderService } from "@shared/services/order/order.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";

interface OrderItem {
  quantity: number;
  product: { title: string };
  totalPrice: number;
}

interface ShippingInfo {
  addressLine1: string;
  addressLine2: string;
  city: string;
  name: string;
}

interface Order {
  datePlaced: number;
  items: OrderItem[];
  shipping: ShippingInfo;
  userId: string;
}

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$!: Observable<AngularFireAction<DatabaseSnapshot<Order>>[]>;

  constructor(private authService: AuthService, private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap(user => this.orderService.getOrdersByUser(user.uid).snapshotChanges() as Observable<AngularFireAction<DatabaseSnapshot<Order>>[]>)
    );

  }
}
