import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {IssuesModule} from "./modules/issues/issues.module";
import {BoardModule} from "./modules/board/board.module";
import {AuthModule} from "./modules/auth/auth.module";
import {ProjectsModule} from "./modules/projects/projects.module";
import {SharedModule} from "./modules/shared/shared.module";
import {ProfileModule} from "./modules/profile/profile.module";

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //modules
    SharedModule,
    IssuesModule,
    BoardModule,
    AuthModule,
    ProjectsModule,
    ProfileModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: NZ_I18N, useValue: en_US}
  ]
})
export class AppModule {
}
