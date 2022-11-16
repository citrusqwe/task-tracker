import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../components/header/header.component";
import {SelectProjectComponent} from "../../components/select-project/select-project.component";
import {SelectExecutorComponent} from "../../components/select-executor/select-executor.component";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {HttpClientModule} from "@angular/common/http";
import {NzMessageModule} from "ng-zorro-antd/message";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";

@NgModule({
  declarations: [HeaderComponent, SelectProjectComponent, SelectExecutorComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzDropDownModule,
    NzSelectModule,
    HttpClientModule,
    NzMessageModule,
    NzIconModule,
    NzFormModule,
    NzGridModule
  ],
  exports: [HeaderComponent, SelectProjectComponent, SelectExecutorComponent]
})
export class SharedModule {
}
