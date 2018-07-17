import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxRouteUtilsDemoRoutingModule } from './ngx-route-utils-demo-routing.module';
import { IndexRouteComponent } from './index-route/index-route.component';

@NgModule({
  imports: [
    CommonModule,
    NgxRouteUtilsDemoRoutingModule
  ],
  declarations: [ IndexRouteComponent]
})
export class NgxRouteUtilsDemoModule { }
