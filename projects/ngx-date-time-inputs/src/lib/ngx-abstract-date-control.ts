import { ControlValueAccessor, FormControl } from '@angular/forms';
import moment from 'moment';
import { MODEL_DATE_FORMAT } from './shared';
import { NgxDateTimeParser } from './ngx-date-time-parser';

export abstract class NgxAbstractDateControl implements ControlValueAccessor {


  private _date: moment.Moment = moment();
  private _control: FormControl = new FormControl('', { updateOn: 'blur' });
  abstract displayFormat: string;


  propagateChange: any = () => { };
  propagateTouched: any = () => { };


  constructor() {

  }

  get date(): moment.Moment {
    return this._date;
  }

  get control(): FormControl {
    return this._control;
  }

  /**
   * Write control value.
   */
  writeValue(dateString: string) {
    let m = moment(dateString, MODEL_DATE_FORMAT);
    if (! m.isValid()) {
      m = moment();
    }
    this.date.year(m.year()).month(m.month()).date(m.date());
    this.control.setValue(this.date.format(this.displayFormat));
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  /**
   * Update the model. Used by the input when on change and blur.
   */
  handleInputChange() {
    const d = NgxDateTimeParser.parseDate(this.control.value);
    this.date.year(d.year).month(d.month).date(d.date);
    const modelValue = this.date.format(MODEL_DATE_FORMAT);
    this.control.setValue(this.date.format(this.displayFormat));
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }

}
