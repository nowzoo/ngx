import { Component, Input, forwardRef } from '@angular/core';
import { NgxAbstractDateControl } from '../ngx-abstract-date-control';
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
export class DateControlComponent extends NgxAbstractDateControl {

  @Input() displayFormat = 'LL';
  @Input() inputId: string;
  @Input() inputClass = 'form-control';
  @Input() inputPlaceholder = 'Enter date...';
  constructor() {
    super();
  }

}
