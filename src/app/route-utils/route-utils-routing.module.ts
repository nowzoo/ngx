import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRouteComponent } from './index-route/index-route.component';
import { RouteUtilsRouteComponent } from './route-utils-route/route-utils-route.component';
import { GuardedRouteComponent } from './guarded-route/guarded-route.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '', component: RouteUtilsRouteComponent, children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'guarded', component: GuardedRouteComponent},
      {path: '', component: IndexRouteComponent}

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteUtilsRoutingModule { }
