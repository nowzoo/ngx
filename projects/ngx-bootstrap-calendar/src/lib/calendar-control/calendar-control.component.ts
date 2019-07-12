import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import {
  NgxAbstractInputComponent,
  NgxDateTimeService,
  MODEL_DATE_FORMAT
} from '@nowzoo/ngx-date-time-inputs';

import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'ngx-bootstrap-calendar-control',
  templateUrl: './calendar-control.component.html',
  styleUrls: ['./calendar-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarControlComponent),
      multi: true
    }
  ]
})
export class CalendarControlComponent extends NgxAbstractInputComponent implements ControlValueAccessor {

  /**
   * The moment.js format to be displayed in the input box. Default `LL`.
   */
  @Input() displayFormat = 'LL';

  /**
   * The placeholder attribute of the input.
   * This will also be used to set the title of the calendar modal.
   */
  @Input() inputPlaceholder = 'Enter a date';

  /**
   * The DOM id to be applied to the input.
   */
  @Input() inputId: string;

  /**
   * The Bootstrap size to be applied to the input group.
   */
  @Input() boostrapSize: 'sm' | 'lg' = null;

  /**
   * Whether the control is currently invalid, according to your control's validators.
   */
  @Input() invalid = false;


  /**
   * Optional. The min date passed as a string in the format `YYYY-MM-DD`.
   */
  @Input() min: string = null;

  /**
   * Optional. The max date passed as a string in the format `YYYY-MM-DD`.
   */
  @Input() max: string = null;




  constructor(
    svc: NgxDateTimeService
  ) {
    super(svc);
  }

  get selectedDateForCal(): string {
    return this.date.format(MODEL_DATE_FORMAT);
  }

  /**
   * @ignore
   * Calculate the input class based on validity.
   */
  get inputClass(): string {
    const classes = ['form-control'];
    if (this.invalid) {
      classes.push('is-invalid');
    }
    return classes.join(' ');
  }


  /**
   * @ignore
   * Calculate the input group class
   */
  get inputGroupClass(): string {
    const classes = ['input-group'];
    if (this.boostrapSize) {
      classes.push(`input-group-${this.boostrapSize}`);
    }
    return classes.join(' ');
  }



  /**
   * @ignore
   * Write control value.
   */
  writeValue(dateString: string) {
    const m = moment(dateString, MODEL_DATE_FORMAT);
    this.date.year(m.year()).month(m.month()).date(m.date());
    this.control.setValue(this.date.format(this.displayFormat));
  }

  /**
   * Update the model. Used by the input when on change and blur.
   */
  handleInputChange() {
    const d = this.dateService.parseDate(this.control.value);
    this.date.year(d.year).month(d.month).date(d.date);
    const modelValue = this.date.format(MODEL_DATE_FORMAT);
    this.control.setValue(this.date.format(this.displayFormat));
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }

  /**
   * Update the model when a calendar date is selected.
   */
  onCalendarSelected(dateString: string) {
    this.writeValue(dateString);
    const modelValue = this.date.format(MODEL_DATE_FORMAT);
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }
}
