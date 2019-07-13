import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { CalendarControlComponent } from './calendar-control/calendar-control.component';
import { NgxBootstrapModalModule } from '@nowzoo/ngx-bootstrap-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDateTimeModule } from '@nowzoo/ngx-date-time';


@NgModule({
  declarations: [
    CalendarComponent,
    CalendarModalComponent,
    CalendarControlComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxBootstrapModalModule,
    NgxDateTimeModule
  ],
  exports: [
    CalendarComponent,
    CalendarModalComponent,
    CalendarControlComponent
  ]
})
export class NgxBootstrapCalendarModule {
  constructor() {
    library.add(faCalendar);
  }
}
