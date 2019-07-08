import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo-date-time-inputs';
  fg: FormGroup;
  selected = '2019-07-04';
  min = '2019-06-04';
  max = '2019-08-02';

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fg = this._fb.group({
      date: [this.selected],
      time: ['09:30']
    });
    this.fg.valueChanges.subscribe(val => this.selected = val);
  }

  setFromCal(e: any) {
    console.log(e);
    this.fg.get('date').setValue(e);
  }

}
