import { Directive, TemplateRef, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowTitleContext } from './api';
import { NgxWindowTitleService } from './ngx-window-title.service';

@Directive({
  selector: '[ngxWindowTitle]'
})
export class WindowTitleDirective implements OnInit, OnDestroy {
  @Input() ngxWindowTitle: WindowTitleContext;
  constructor(
    private _templateRef: TemplateRef<any>,
    private _route: ActivatedRoute,
    private _service: NgxWindowTitleService
  ) { }

  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }
  get route(): ActivatedRoute {
    return this._route;
  }
  get service(): NgxWindowTitleService {
    return this._service;
  }

  ngOnInit() {
    this.service.setWindowTitle(this.route, this.templateRef, this.ngxWindowTitle);
  }

  ngOnDestroy() {
    this.service.removeWindowTitle(this.route);
  }

}
