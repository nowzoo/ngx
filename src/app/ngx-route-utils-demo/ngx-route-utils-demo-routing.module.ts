import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRouteComponent } from './index-route/index-route.component';

const routes: Routes = [
  {path: 'ngx-sign-in-redirect-service',
  loadChildren: './ngx-sign-in-redirect-service-demo/ngx-sign-in-redirect-service-demo.module#NgxSignInRedirectServiceDemoModule'},
{path: '', component: IndexRouteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxRouteUtilsDemoRoutingModule { }
