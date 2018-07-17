import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SavingStatusComponent } from './saving-status/saving-status.component';
import { DemoControlComponent } from './demo-control/demo-control.component';
import { DemoArrayComponent } from './demo-array/demo-array.component';
import { DemoNestedArrayComponent } from './demo-nested-array/demo-nested-array.component';
import { DemoRadiosComponent } from './demo-radios/demo-radios.component';
import { IndexRouteComponent } from './index-route/index-route.component';
import { NgxFireModule } from '@nowzoo/ngx-fire';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: IndexRouteComponent}]),
    NgxFireModule
  ],
  declarations: [
    SavingStatusComponent,
    DemoControlComponent,
    DemoArrayComponent,
    DemoNestedArrayComponent,
    DemoRadiosComponent,
    IndexRouteComponent,
  ]
})
export class NgxFireDemoModule { }
