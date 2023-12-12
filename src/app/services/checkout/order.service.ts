import {Injectable} from '@angular/core';
import {AngularFireDatabase, QueryFn} from "@angular/fire/compat/database";
import {ShoppingCartService} from "../shopping/shopping-cart.service";

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: unknown) {
    let result = await this.db.list('/orders').push(order);
    await this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    const queryFn: QueryFn = ref => ref.orderByChild('userId').equalTo(userId);
    return this.db.list('/orders', queryFn);
  }

}
