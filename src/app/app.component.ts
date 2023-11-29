//app.component.ts
import {Component} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // in the constructor we are subscribing to the user$ observable from auth service because we want to save the user to the database when the user logs in, we do in app.component.ts because we want to do it only once when the app starts.

  // Inject: userService to save the user to the database , auth service to get access to the user$ observable, router service to navigate to the returnUrl

  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => { // here we are subscribing to the user$ observable from auth service
      if (user) { // if user is logged in
        userService.save(user); // save user to the database
        const returnUrl = localStorage.getItem('returnUrl'); // get returnUrl from localStorage and store it in a variable

        if (returnUrl) { // if there is a returnUrl
          console.log('Navigating to returnUrl:', returnUrl); // log the returnUrl
          localStorage.removeItem('returnUrl'); // remove from localStorage, to clear after use.
          router.navigateByUrl(returnUrl).then(r => console.log(r)); // navigate to returnUrl
        }
      }
    });
  }

}
