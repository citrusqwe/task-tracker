import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardComponent} from "./board.component";
import {RouterModule, Routes} from "@angular/router";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {ReactiveFormsModule} from "@angular/forms";
import {IconsProviderModule} from "../../icons-provider.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSpinModule} from "ng-zorro-antd/spin";

const routes: Routes = [
  {
    path: '',
    component: BoardComponent
  }
];

@NgModule({
  declarations: [BoardComponent, TaskListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    DragDropModule,
    NzPopoverModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzButtonModule,
    NzFormModule,
    NzSpinModule
  ],
  exports: [BoardComponent, RouterModule]
})
export class BoardModule {
}
