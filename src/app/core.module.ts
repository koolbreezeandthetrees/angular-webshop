//core.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./core/components/home/home.component";
import {LoginComponent} from "./core/components/login/login.component";
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "./shared.module";



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
