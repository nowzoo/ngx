import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { NgxDateTimeUtils } from '@nowzoo/ngx-date-time-inputs';

@Component({
  selector: 'demo-bootstrap-calendar',
  templateUrl: './bootstrap-calendar.component.html',
  styleUrls: ['./bootstrap-calendar.component.scss']
})
export class BootstrapCalendarComponent implements OnInit {


  fc: FormControl;
  inlineValue = '2019-12-25';
  modalValue = '2019-12-25';
  min = '2019-11-20';
  max = '2020-01-06';
  constructor() { }

  ngOnInit() {
    this.fc = new FormControl('2019-12-25', [
      NgxDateTimeUtils.minDateValidator(this.min),
      NgxDateTimeUtils.maxDateValidator(this.max)
    ]);
  }

}
