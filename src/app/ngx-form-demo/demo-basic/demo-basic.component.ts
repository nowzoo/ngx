import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-demo-basic',
  templateUrl: './demo-basic.component.html',
  styleUrls: ['./demo-basic.component.scss']
})
export class DemoBasicComponent implements OnInit {

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
