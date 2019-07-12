import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'demo-tooltip-template',
  templateUrl: './tooltip-template.component.html',
  styleUrls: ['./tooltip-template.component.scss']
})
export class TooltipTemplateComponent implements OnInit, OnDestroy {

  counter = 0;
  timer = 0;
  interval: any = null;
  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }

  }

  onTooltipEvent(e: any) {
    if (e.type === 'shown') {
      this.counter++;
      this.timer = 0;
      this.interval = setInterval(() => {
        this.timer++;
      }, 1000);
    }
    if (e.type === 'hidden') {
      clearInterval(this.interval);
      this.interval = null;
    }
  }



}
