import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DateTimeComponent } from './date-time.component';
import { DateComponent } from './date/date.component';
import { NgxDateTimeInputsModule } from 'projects/ngx-date-time-inputs/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeComponent } from './time/time.component';

const routes: Routes = [
  { path: '', component: DateTimeComponent }
];



@NgModule({
  declarations: [DateTimeComponent, DateComponent, TimeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDateTimeInputsModule,
    ReactiveFormsModule
  ]
})
export class DateTimeModule { }
