import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { NgxRouteUtilsModule } from '@nowzoo/ngx-route-utils';
import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';

import { NgxAppMsgModule } from '@nowzoo/ngx-app-msg';


const routes: Routes = [
  {path: 'ngx-app-msg', loadChildren: './ngx-app-msg-demo/ngx-app-msg-demo.module#NgxAppMsgDemoModule'},
  {path: 'ngx-form', loadChildren: './ngx-form-demo/ngx-form-demo.module#NgxFormDemoModule'},
  {path: 'ngx-fire', loadChildren: './ngx-fire-demo/ngx-fire-demo.module#NgxFireDemoModule'},
  {path: 'ngx-route-utils', loadChildren: './ngx-route-utils-demo/ngx-route-utils-demo.module#NgxRouteUtilsDemoModule'},
  {path: '', component: IndexRouteComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxRouteUtilsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxAppMsgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
