import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  id = 'demo-date-time';
  dateControl: FormControl;
  timeControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.dateControl = new FormControl('2019-07-04');
    this.timeControl = new FormControl('20:45');
  }

}
