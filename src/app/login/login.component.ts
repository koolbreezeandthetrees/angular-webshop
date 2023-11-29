// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/user-access/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // auth service to get access to the user$ observable. User$ holds information about the currently logged in user. Like the user's name, email, and profile picture.
  // router service to navigate to the returnUrl. ReturnUrl is stored in local storage
  constructor(private auth: AuthService, private router: Router) {}

  // 'async' keyword is used to make the function asynchronous. This means that the function will not block the rest of the code from executing while it is running.
  // try and catch blocks are used to handle errors. The code in the try block is executed first. If an error occurs, the code in the catch block is executed.
  //'await' keyword is used to wait for the auth service to finish logging in the user. This is necessary because the login method is asynchronous.
  // this.handleLoginSuccess() is called after the user is logged in successfully. Which navigates to the returnUrl.

  async loginWithGoogle() {
    try {
      await this.auth.login();
      this.handleLoginSuccess();
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  }

  // method to navigate to the returnUrl.

  private handleLoginSuccess() {
    // Check if there's a returnUrl in local storage
    const returnUrl = localStorage.getItem('returnUrl');

    if (returnUrl) {
      // Clear returnUrl after using it
      localStorage.removeItem('returnUrl');
      // Navigate to returnUrl
      this.router.navigateByUrl(returnUrl).then(r => console.log(r));
    } else {
      // If no returnUrl, navigate to a default page
      this.router.navigate(['/']).then(r => console.log(r));
    }
  }
}

