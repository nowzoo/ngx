import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@nowzoo/ngx-form';
import { NgxFormDemoRoutingModule } from './ngx-form-demo-routing.module';
import { IndexRouteComponent } from './index-route/index-route.component';
import { DemoBasicComponent } from './demo-basic/demo-basic.component';
import { DemoErrorComponent } from './demo-error/demo-error.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxFormModule,
    NgxFormDemoRoutingModule
  ],
  declarations: [IndexRouteComponent, DemoBasicComponent, DemoErrorComponent]
})
export class NgxFormDemoModule { }
