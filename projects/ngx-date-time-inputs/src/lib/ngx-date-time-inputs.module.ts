import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { NgxDateTimeService } from './ngx-date-time.service';
import { NgxDateInputComponent } from './ngx-date-input.component';
import { NgxTimeInputComponent } from './ngx-time-input.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  declarations: [
    NgxDateInputComponent,
    NgxTimeInputComponent,
  ],
  exports: [
    NgxDateInputComponent,
    NgxTimeInputComponent
  ],
  providers: [ NgxDateTimeService ]
})
export class NgxDateTimeInputsModule {

}
