import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from "./projects.component";
import {RouterModule} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ProjectsCreateComponent} from "./components/projects-create/projects-create.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {ProjectItemComponent} from './components/project-item/project-item.component';
import {NzIconTestModule} from "ng-zorro-antd/icon/testing";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import {ProjectsRoutingModule} from "./projects-routing.module";
import {NzCardModule} from "ng-zorro-antd/card";
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";


@NgModule({
  declarations: [ProjectsComponent, ProjectsCreateComponent, ProjectItemComponent, ProjectInfoComponent, ProjectEditComponent],
    imports: [
        CommonModule,
        NzLayoutModule,
        NzPageHeaderModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
        ReactiveFormsModule,
        NzSpinModule,
        NzIconTestModule,
        NzDropDownModule,
        ProjectsRoutingModule,
        NzCardModule,
        NzTabsModule,
        NzSelectModule,
        NzListModule,
        NzTypographyModule,
        NzModalModule,
        NzAutocompleteModule
    ],
  exports: [ProjectsComponent, RouterModule]
})
export class ProjectsModule {
}
