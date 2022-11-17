import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IssuesComponent} from "./issues.component";
import {RouterModule, Routes} from "@angular/router";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {IssuePreviewComponent} from './components/issue-preview/issue-preview.component';
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {SelectProjectComponent} from "../../components/select-project/select-project.component";
import {SharedModule} from "../shared/shared.module";
import {NzSpaceModule} from "ng-zorro-antd/space";

const routes: Routes = [
  {
    path: '',
    component: IssuesComponent
  }
];

@NgModule({
  declarations: [IssuesComponent, IssuePreviewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        NzTableModule,
        NzFormModule,
        NzSelectModule,
        NzInputModule,
        NzWaveModule,
        NzButtonModule,
        NzIconModule,
        NzModalModule,
        ReactiveFormsModule,
        NzSpinModule,
        NzSpaceModule
    ],
  exports: [IssuesComponent]
})
export class IssuesModule {
}
