// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



import { AngularFireModule } from '@angular/fire/compat';


import { AppComponent } from './app.component';

import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from "./material/material.module";
import {MatSortModule} from "@angular/material/sort";

import {SharedModule} from "./shared.module";
import {AdminModule} from "./admin.module";
import {ShoppingModule} from "./shopping.module";
import {CoreModule} from "./core.module";



const firebaseConfig = {
  apiKey: "AIzaSyBn_Sr6bL8ICNkSYn3ZgfSJnHc4U75rs3U",
  authDomain: "webshop-2fd3e.firebaseapp.com",
  databaseURL: "https://webshop-2fd3e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-2fd3e",
  storageBucket: "webshop-2fd3e.appspot.com",
  messagingSenderId: "993741169575",
  appId: "1:993741169575:web:b05fb32f4e711c42934c82",
  measurementId: "G-FWWTB298PL"
}


@NgModule({
  declarations: [

    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
    ]),
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSortModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
