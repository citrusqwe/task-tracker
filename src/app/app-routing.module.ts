import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./modules/auth/auth.component";
import {RegisterComponent} from "./modules/auth/components/register/register.component";
import {LoginComponent} from "./modules/auth/components/login/login.component";

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: '', pathMatch: 'full', redirectTo: 'register'},
    ]
  },
  {path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},
  {path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)},
  {path: 'board/:id', loadChildren: () => import('./modules/board/board.module').then(m => m.BoardModule)},
  {path: 'issues', loadChildren: () => import('./modules/issues/issues.module').then(m => m.IssuesModule)},
  {path: '', pathMatch: 'full', redirectTo: '/issues'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
