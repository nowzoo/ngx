import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgxFormInvalidOn } from '../invalid-on';
import { NgxFormUtils } from '../utils';
@Component({
  selector: 'ngx-form-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class NgxFormErrorComponent {
  @Input() control: AbstractControl;
  @Input() key: string;
  @Input() invalidOn: NgxFormInvalidOn = NgxFormInvalidOn.touched;
  showInvalidKey = NgxFormUtils.showInvalidKey;
}
