import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxRouteUtilsModule } from '@nowzoo/ngx-route-utils';
import { AppComponent } from './app.component';
import { IndexRouteComponent } from './index-route/index-route.component';


const routes: Routes = [
  {path: 'route-utils', loadChildren: './route-utils/route-utils.module#RouteUtilsModule'},
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
    NgxRouteUtilsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
