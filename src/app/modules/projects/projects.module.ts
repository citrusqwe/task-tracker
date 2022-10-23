import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from "./projects.component";
import {RouterModule, Routes} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ProjectsCreateComponent} from "./components/projects-create/projects-create.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import { ProjectItemComponent } from './components/project-item/project-item.component';
import {NzIconTestModule} from "ng-zorro-antd/icon/testing";

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'create',
    component: ProjectsCreateComponent
  }
];

@NgModule({
  declarations: [ProjectsComponent, ProjectsCreateComponent, ProjectItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzLayoutModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzIconTestModule
  ],
  exports: [ProjectsComponent, RouterModule]
})
export class ProjectsModule {
}
