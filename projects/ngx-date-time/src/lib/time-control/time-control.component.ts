import { Component, Input, forwardRef } from '@angular/core';
import { NgxAbstractTimeControl } from '../ngx-abstract-time-control';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeControlComponent),
      multi: true
    }
  ]
})
export class TimeControlComponent extends NgxAbstractTimeControl {
  @Input() displayFormat = 'LT';
  @Input() inputId: string;
  @Input() inputClass = 'form-control';
  @Input() inputPlaceholder = 'Enter time...';
  constructor() {
    super();
  }



}
