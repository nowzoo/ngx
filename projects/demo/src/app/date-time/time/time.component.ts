import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  static ct = 0;
  id = `demo-time-${++TimeComponent.ct}`;
  control: FormControl;

  constructor() { }

  ngOnInit() {
    this.control = new FormControl('09:30');
  }

}
