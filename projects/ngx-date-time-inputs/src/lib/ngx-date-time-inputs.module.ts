import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';

import { NgxDateTimeService } from './ngx-date-time.service';
import { NgxDateInputComponent } from './ngx-date-input.component';
import { NgxTimeInputComponent } from './ngx-time-input.component';
import { DateControlComponent } from './date-control/date-control.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MomentModule,
    FontAwesomeModule
  ],
  declarations: [
    NgxDateInputComponent,
    NgxTimeInputComponent,
    DateControlComponent,
    CalendarComponent,
    CalendarModalComponent
  ],
  exports: [
    NgxDateInputComponent,
    NgxTimeInputComponent,
    DateControlComponent,
    CalendarComponent,
    CalendarModalComponent
  ],
  providers: [NgxDateTimeService]
})
export class NgxDateTimeInputsModule {
  constructor() {
    library.add(faCalendar);
  }
}
