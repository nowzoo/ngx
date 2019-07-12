import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-bootstrap-calendar',
  templateUrl: './bootstrap-calendar.component.html',
  styleUrls: ['./bootstrap-calendar.component.scss']
})
export class BootstrapCalendarComponent implements OnInit {


  fc: FormControl;
  inlineValue = '2019-12-25';
  modalValue = '2019-12-25';
  constructor() { }

  ngOnInit() {
    this.fc = new FormControl('2019-12-25');
  }

}
