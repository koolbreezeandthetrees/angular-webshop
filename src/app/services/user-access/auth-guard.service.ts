//auth-guard.service.ts
import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { AuthService } from "./auth.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// The auth guard is used to prevent unauthenticated users from accessing restricted routes, in this example it's used in app.routing.ts to protect the home page route.
export class AuthGuard implements CanActivate {

  // Inject: auth service to get access to the user$ observable, router service to navigate to the login page
  constructor(private auth: AuthService, private router: Router) { }

  // We use the 'canActivate' method in app.module.ts to have control over which routes can be accessed by which users.
  // 'canActivate' takes two arguments: the first is the route we are trying to access, the second is the state of the router at the moment we are trying to access the route.
  // 'RouterStateSnapshot' is an interface that has a property called 'url' which is the url of the route we are trying to access.
  // 'pipe' is a method that allows us to combine multiple operators into a single operator. In this case we are using the 'pipe' method to combine the 'map' operator with the 'switchMap' operator.
  // We use the 'map' operator to convert the observable to a boolean.

  // if the user is logged in, we return true, otherwise we navigate to the login page and return false.
  // if false is returned, the route is not activated and the user is redirected to the login page.
  // 'navigate method' takes two arguments: the first is the route we want to navigate to, the second is an object that functions as a query string. A query string is a way to pass data to a route.
  // When a user attempts to access a restricted route but is not authenticated, they are redirected to the login page. However, after successfully logging in, they should ideally be redirected back to the originally requested URL (the restricted route they were trying to access). The returnUrl parameter is used to store this original URL so that after authentication, the application can redirect the user back to that specific route.
  // the url is saved in local storage so that it can be accessed after the user logs in. This save is done in login.component.ts.
  canActivate(route: any, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          // Save the returnUrl in local storage
          localStorage.setItem('returnUrl', state.url);

          // Redirect to the login page
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }


}
