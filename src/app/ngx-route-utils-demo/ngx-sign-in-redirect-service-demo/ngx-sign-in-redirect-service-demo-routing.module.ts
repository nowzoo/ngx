import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerRouteComponent } from './container-route/container-route.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { SignInRouteComponent } from './sign-in-route/sign-in-route.component';
import { GuardedRouteComponent } from './guarded-route/guarded-route.component';

const routes: Routes = [
  {
    path: '', component: ContainerRouteComponent, children: [
      {path: 'sign-in', component: SignInRouteComponent},
      {path: 'guarded', component: GuardedRouteComponent},
      {path: '', component: IndexRouteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxSignInRedirectServiceDemoRoutingModule { }
