import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteUtilsRoutingModule } from './route-utils-routing.module';
import { GuardedRouteComponent } from './guarded-route/guarded-route.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { RouteUtilsRouteComponent } from './route-utils-route/route-utils-route.component';

@NgModule({
  imports: [
    CommonModule,
    RouteUtilsRoutingModule
  ],
  declarations: [GuardedRouteComponent, SignInComponent, IndexRouteComponent, RouteUtilsRouteComponent]
})
export class RouteUtilsModule { }
