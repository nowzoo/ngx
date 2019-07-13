import { ControlValueAccessor, FormControl } from '@angular/forms';
import moment from 'moment';
import { MODEL_TIME_FORMAT } from './shared';
import { NgxDateTimeParser } from './ngx-date-time-parser';

export abstract class NgxAbstractTimeControl implements ControlValueAccessor {


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
  writeValue(timeString: string) {
    let m = moment(timeString, MODEL_TIME_FORMAT);
    if (!m.isValid()) {
      m = moment();
    }
    this.date.hour(m.hour()).minute(m.minute());
    this.control.setValue(this.date.format(this.displayFormat));
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  /**
   * Update the model. Used by the input on change and blur.
   */
  handleInputChange() {
    const t = NgxDateTimeParser.parseTime(this.control.value);
    this.date.hour(t.hour).minute(t.minute);
    const modelValue = this.date.format(MODEL_TIME_FORMAT);
    this.control.setValue(this.date.format(this.displayFormat));
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }

}
