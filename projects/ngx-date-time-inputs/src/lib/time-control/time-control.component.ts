import { Component, Input } from '@angular/core';
import { NgxAbstractTimeControl } from '../ngx-abstract-time-control';

@Component({
  selector: 'ngx-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss']
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
