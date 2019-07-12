import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  static ct = 0;
  id = `demo-date-${++DateComponent.ct}`;
  control: FormControl;

  constructor() { }

  ngOnInit() {
    this.control = new FormControl('2019-12-25');
  }

}
