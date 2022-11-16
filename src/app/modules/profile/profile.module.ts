import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        NzGridModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzPageHeaderModule,
        ReactiveFormsModule
    ],
  exports: []
})
export class ProfileModule {
}
