import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxAppMsgDemoRoutingModule } from './ngx-app-msg-demo-routing.module';
import { IndexRouteComponent } from './index-route/index-route.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  imports: [
    CommonModule,
    NgxAppMsgDemoRoutingModule
  ],
  declarations: [IndexRouteComponent, DemoComponent]
})
export class NgxAppMsgDemoModule { }
