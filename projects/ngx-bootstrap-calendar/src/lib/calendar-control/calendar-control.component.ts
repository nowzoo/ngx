import { Component, Input, forwardRef } from '@angular/core';
import {
  NgxDateTimeService,
  NgxDateTimeUtils,
  MODEL_DATE_FORMAT
} from '@nowzoo/ngx-date-time-inputs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
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
export class CalendarControlComponent  implements ControlValueAccessor {

  private _control: FormControl = new FormControl('', { updateOn: 'blur' });
  private _date: moment.Moment = moment();

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



  propagateChange: any = () => { };
  propagateTouched: any = () => { };


  constructor(
  ) {

  }



  get control(): FormControl {
    return this._control;
  }

  get date(): moment.Moment {
    return this._date;
  }



  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  get selectedDateForCal(): string {
    return this.date.format(MODEL_DATE_FORMAT);
  }








  /**
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
    const d = NgxDateTimeUtils.parseDate(this.control.value);
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
