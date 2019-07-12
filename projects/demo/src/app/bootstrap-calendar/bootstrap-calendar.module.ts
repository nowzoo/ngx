import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxBootstrapCalendarModule } from '@nowzoo/ngx-bootstrap-calendar';
import { ReactiveFormsModule } from '@angular/forms';


import { BootstrapCalendarComponent } from './bootstrap-calendar.component';

const routes: Routes = [
  { path: '', component: BootstrapCalendarComponent }
];

@NgModule({
  declarations: [
    BootstrapCalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxBootstrapCalendarModule,
    ReactiveFormsModule
  ]
})
export class BootstrapCalendarModule { }
