//navbar.component.ts
import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AppUser} from "../models/app-user";



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // variable to store the user
  appUser: AppUser | null | undefined;

  // Inject: auth service to get access to the appUser$ observable
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

  get getAuth(){
    return this.auth;
  }


}
