import { Component, Input, forwardRef } from '@angular/core';
import {
  NgxAbstractDateControl,
  MODEL_DATE_FORMAT
} from '@nowzoo/ngx-date-time';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class CalendarControlComponent extends NgxAbstractDateControl {


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
  ) {
    super();
  }


  get selectedDateForCal(): string {
    return this.date.format(MODEL_DATE_FORMAT);
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
