import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProjectInfoComponent} from "./components/project-info/project-info.component";
import {ProjectsComponent} from "./projects.component";
import {ProjectsCreateComponent} from "./components/projects-create/projects-create.component";
import {ProjectEditComponent} from "./components/project-edit/project-edit.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'create',
    component: ProjectsCreateComponent
  },
  {
    path: 'edit/:id',
    component: ProjectEditComponent
  },
  {
    path: ':id',
    component: ProjectInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
