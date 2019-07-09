import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'demo-popover-templates',
  templateUrl: './popover-templates.component.html',
  styleUrls: ['./popover-templates.component.scss']
})
export class PopoverTemplatesComponent implements OnInit, OnDestroy {

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

  onPopoverEvent(e: any) {
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
