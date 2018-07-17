import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSignInRedirectServiceDemoRoutingModule } from './ngx-sign-in-redirect-service-demo-routing.module';
import { ContainerRouteComponent } from './container-route/container-route.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { SignInRouteComponent } from './sign-in-route/sign-in-route.component';
import { GuardedRouteComponent } from './guarded-route/guarded-route.component';

import { AuthService } from './auth.service';
@NgModule({
  imports: [
    CommonModule,
    NgxSignInRedirectServiceDemoRoutingModule
  ],
  declarations: [
    IndexRouteComponent,
    SignInRouteComponent,
    GuardedRouteComponent,
    ContainerRouteComponent
  ],
  providers: [AuthService]
})
export class NgxSignInRedirectServiceDemoModule { }
