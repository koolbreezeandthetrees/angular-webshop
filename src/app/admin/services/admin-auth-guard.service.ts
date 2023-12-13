import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "@shared/services/auth/auth.service";
import { map, switchMap } from "rxjs/operators";
import { UserService } from "@shared/services/auth/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  // auth service to get access to the user variable which is stored here.
  // user service to have access to AppUser interface to check if user is admin or not.

  constructor(private auth: AuthService, private userService: UserService) {
  }


  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser?.isAdmin ?? false)
    );
  }
}
