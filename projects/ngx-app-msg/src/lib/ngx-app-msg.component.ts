import { Component, OnInit, OnDestroy, Input } from '@angular/core';


import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxAppMsgService } from './ngx-app-msg.service';
import {INgxAppMsg } from './interfaces';
@Component({
  selector: 'ngx-app-msg',
  templateUrl: './ngx-app-msg.component.html',
  styleUrls: ['./ngx-app-msg.component.scss']
})
export class NgxAppMsgComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() autohideAfter = 4000;
  shown = false;
  message: string;
  context: string;
  hideTimeout: any = null;
  constructor(private service: NgxAppMsgService) { }

  ngOnInit() {
    this.service.messages$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(val => {
        this.handleChange(val);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleChange(msg: INgxAppMsg) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    if (! msg) {
      this.shown = false;
    } else {
      this.message = msg.message;
      this.context = msg.context;
      if (msg.autohide) {
        this.hideTimeout = setTimeout(() => this.shown = false, this.autohideAfter);
      }
      this.shown = true;
    }
  }

}
