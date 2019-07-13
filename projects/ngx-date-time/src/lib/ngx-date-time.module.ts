import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { DateControlComponent } from './date-control/date-control.component';
import { TimeControlComponent } from './time-control/time-control.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  declarations: [
    DateControlComponent,
    TimeControlComponent,
  ],
  exports: [
    DateControlComponent,
    TimeControlComponent,
  ],
  providers: [  ]
})
export class NgxDateTimeModule {

}
