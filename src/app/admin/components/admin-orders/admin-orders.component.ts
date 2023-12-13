// admin-orders.component.ts

import { Component, OnInit } from '@angular/core';
import { OrderService } from "@shared/services/order/order.service";
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

interface Order {
  datePlaced: number;
  shipping: {
    name: string;
  };
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$!: Observable<AngularFireAction<DatabaseSnapshot<Order>>[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrders().snapshotChanges() as Observable<AngularFireAction<DatabaseSnapshot<Order>>[]>;
  }
}
