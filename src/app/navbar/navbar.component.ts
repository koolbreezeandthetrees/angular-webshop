//navbar.component.ts
import { Component } from '@angular/core';
import {AuthService} from "../services/user-access/auth.service";
import {AppUser} from "../models/app-user";



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // variable to store the user
  appUser: AppUser | null | undefined;

  // Inject: auth service to get access to the appUser$ observable, and shoppingCartService to get access to the cart$ observable
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser); // here we are subscribing to the appUser$ observable from auth service

  }

  logout() {
    this.auth.logout();
  }

  get getAuth(){
    return this.auth;
  }


}
