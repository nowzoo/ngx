import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DateTimeComponent } from './date-time.component';
import { NgxDateTimeModule } from '@nowzoo/ngx-date-time';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DateTimeComponent }
];



@NgModule({
  declarations: [DateTimeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDateTimeModule,
    ReactiveFormsModule
  ]
})
export class DateTimeModule { }
