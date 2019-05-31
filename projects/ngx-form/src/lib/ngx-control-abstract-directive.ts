import {
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NGX_FORM_DEFAULT_OPTIONS, INgxFormOptions, NgxValidity } from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';

export abstract class NgxControlAbstractDirective implements OnInit, OnDestroy {
  protected _ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private _options: INgxFormOptions,
    protected _controlValidity: NgxControlValidityDirective
  ) { }

  get options(): INgxFormOptions {
    return Object.assign({}, NGX_FORM_DEFAULT_OPTIONS, this._options);
  }

  ngOnInit() {
    if (! this._controlValidity) {
      return;
    }
    this._controlValidity.validity$
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((validity: NgxValidity) => {
        this._update(validity);
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  protected abstract _update(validity: NgxValidity): void;
}
