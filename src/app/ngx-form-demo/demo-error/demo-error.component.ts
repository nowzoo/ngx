import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxFormUtils } from '@nowzoo/ngx-form';
@Component({
  selector: 'app-demo-error',
  templateUrl: './demo-error.component.html',
  styleUrls: ['./demo-error.component.scss']
})
export class DemoErrorComponent implements OnInit {

  showInvalid = NgxFormUtils.showInvalid;
  fcTouched: FormControl;
  fcDirty: FormControl;
  fcAlways: FormControl;

  formId = 'app-demo-basic';
  constructor() { }

  ngOnInit() {
    this.fcTouched = new FormControl('', [Validators.required, Validators.email]);
    this.fcDirty = new FormControl('', [Validators.required, Validators.email]);
    this.fcAlways = new FormControl('', [Validators.required, Validators.email]);
  }

}
