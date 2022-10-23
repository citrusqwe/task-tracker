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
  {path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)},
  {path: 'board/:id', loadChildren: () => import('./modules/board/board.module').then(m => m.BoardModule)},
  {path: '', pathMatch: 'full', redirectTo: '/board/1'},
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
