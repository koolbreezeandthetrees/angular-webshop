//check-out.component.ts
import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "@shared/services/order/shopping-cart.service";
import {ShoppingCart} from "@shared/models/shopping-cart";
import {Observable} from "rxjs";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  cart$: Observable<ShoppingCart> | undefined;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
  this.cart$ = this.shoppingCartService.getCart();
  }


}

