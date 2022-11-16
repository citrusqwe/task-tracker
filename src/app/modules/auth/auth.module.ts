import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthComponent} from "./auth.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import {NzResultModule} from "ng-zorro-antd/result";


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, EmailVerificationComponent],
    imports: [
        CommonModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
        RouterModule,
        ReactiveFormsModule,
        NzResultModule
    ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule {
}
