//navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { AppUser } from '@shared/models/app-user';
import { ShoppingCartService } from '@shared/services/order/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '@shared/models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null | undefined;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

  get getAuth() {
    return this.auth;
  }
}
