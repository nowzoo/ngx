import { Component, Input } from '@angular/core';
import { NgxAbstractDateControl } from '../ngx-abstract-date-control';

@Component({
  selector: 'ngx-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss']
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
