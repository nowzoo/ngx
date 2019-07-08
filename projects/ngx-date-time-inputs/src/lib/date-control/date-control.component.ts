import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { NgxAbstractInputComponent } from '../ngx-abstract-input.component';
import { NgxDateTimeService } from '../ngx-date-time.service';
import { MODEL_DATE_FORMAT } from '../shared';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true
    }
  ]
})
export class DateControlComponent extends NgxAbstractInputComponent {
  @ViewChild(CalendarModalComponent, {static: true}) calendar: CalendarModalComponent;
  @Input() displayFormat = 'LL';
  @Input() inputPlaceholder = 'Enter a date';
  @Input() inputId: string;
  @Input() boostrapSize: 'sm' | 'lg' = null;
  @Input() invalid = false;
  @Input() invalidClass = 'is-invalid';
  @Input() min: string = null;
  @Input() max: string = null;


  constructor(
    svc: NgxDateTimeService
  ) {
    super(svc);
  }

  get inputClass(): string {
    const classes = ['form-control'];
    if (this.boostrapSize) {
      classes.push(`form-control-${this.boostrapSize}`);
    }
    return classes.join(' ');
  }

  get inputGroupClass(): string {
    const classes = ['input-group'];
    if (this.boostrapSize) {
      classes.push(`input-group-${this.boostrapSize}`);
    }
    return classes.join(' ');
  }



  writeValue(dateString: string) {
    const d = this.dateService.parseDate(dateString);
    this.date.year(d.year).month(d.month).date(d.date);
    this.control.setValue(this.date.format(this.displayFormat));
  }

  handleInputChange() {
    const d = this.dateService.parseDate(this.control.value);
    this.date.year(d.year).month(d.month).date(d.date);
    const modelValue = this.date.format(MODEL_DATE_FORMAT);
    this.control.setValue(this.date.format(this.displayFormat));
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }

  async showCalendar() {
    const dateString = await this.calendar.show(
      this.date.format(MODEL_DATE_FORMAT), this.min, this.max
    );
    const d = this.dateService.parseDate(dateString);
    this.date.year(d.year).month(d.month).date(d.date);
    this.control.setValue(this.date.format(this.displayFormat));
    const modelValue = this.date.format(MODEL_DATE_FORMAT);
    this.propagateChange(modelValue);
    this.propagateTouched(modelValue);
  }



}
