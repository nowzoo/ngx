import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-color-control',
  templateUrl: './color-control.component.html',
  styleUrls: ['./color-control.component.scss']
})
export class ColorControlComponent implements OnInit {

  public hue: string;
  public color: string;
  constructor() { }

  ngOnInit() {
  }

}
