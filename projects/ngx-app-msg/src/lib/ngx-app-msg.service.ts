import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INgxAppMsg, NgxAppMsgContext } from './interfaces';
@Injectable({
  providedIn: 'root'
})
export class NgxAppMsgService {

  private messages$$: BehaviorSubject<INgxAppMsg>;
  get messages$(): Observable<INgxAppMsg> {
    return this.messages$$.asObservable();
  }
  constructor() {
    this.messages$$ = new BehaviorSubject(null);
  }

  private _show(context: NgxAppMsgContext, message: string, autohide: boolean) {
    this.messages$$.next({
      context: context,
      message: message,
      autohide: autohide
    });
  }

  show(context: NgxAppMsgContext, message: string, autohide = true) {
    this._show(context, message, autohide);
  }

  wait(message: string) {
    this._show('wait', message, false);
  }
  warn(message: string) {
    this._show('warn', message, true);
  }

  success(message: string) {
    this._show('success', message, true);
  }
  hide() {
    this.messages$$.next(null);
  }
}
