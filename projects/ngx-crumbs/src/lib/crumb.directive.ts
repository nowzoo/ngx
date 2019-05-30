import { Directive, Input, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxCrumbsService } from './ngx-crumbs.service';

@Directive({
  selector: '[ngxCrumb]'
})
export class CrumbDirective implements OnInit, OnDestroy {
  @Input() title: string;
  constructor(
    private _templateRef: TemplateRef<any>,
    private _route: ActivatedRoute,
    private _service: NgxCrumbsService
  ) { }

  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }
  get route(): ActivatedRoute {
    return this._route;
  }
  get service(): NgxCrumbsService {
    return this._service;
  }

  ngOnInit() {
    this.service.setRouteBreadcrumb(this.route, this.templateRef, this.title);
  }

  ngOnDestroy() {
    this.service.removeRouteBreadcrumb(this.route);
  }
}
