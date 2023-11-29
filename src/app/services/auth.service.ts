// auth.service.ts
import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider, User} from "firebase/auth";
import {Observable, of} from "rxjs";
import {AppUser} from "../models/app-user";
import {switchMap} from "rxjs/operators";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

// The auth service is where we will implement the login and logout methods.
// We will also use it to get the currently logged-in user from Firebase.
// We put the AuthService in the root injector because we want it to be a singleton. A singleton is a class that is instantiated only once.
// We create auth service to separate the authentication logic from the rest of the application.
// This way we can use the auth service in other parts of the application.
// Otherwise, we would have to implement the authentication logic in every component that needs it. harder to maintain and reuse.

// we create a user$ variable of type Observable<User>
// When this class is instantiated, we set the user$ variable to the user object from firebase.
// the object is that of the currently logged-in user.
// user$ emits the user object whenever the user logs in or logs out.
export class AuthService {
  user$: Observable< User | any>;
  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = afAuth.user;
  }

  // used in login.component.ts to login with Google
  // signInWithRedirect() method that takes a provider as an argument. We use the GoogleAuthProvider to create a new provider.
  // Once the user is logged in, it is saved in Firebase database , this is done in app.component.ts. Here the AuthService is injected and makes use of the user$ variable.
  login() {
    this.afAuth.signInWithRedirect(new GoogleAuthProvider()).then(r => console.log(r));
  }

  logout() {
    this.afAuth.signOut().then(r => console.log(r));
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        } else {
          // Handle the case when user is null
          return of(null);
        }
      })
    );

}

}

