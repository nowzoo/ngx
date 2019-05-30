import { Injectable, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICrumb, IRecord } from './api';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxRouteUtils } from '@nowzoo/ngx-route-utils';

@Injectable()
export class NgxCrumbsService {
  private _breadcrumbsMap: Map<ActivatedRoute, ICrumb> = new Map();
  private _breadcrumbs$: BehaviorSubject<ICrumb[]> = new BehaviorSubject([]);


  get crumbs$(): Observable<ICrumb[]> {
    return this._breadcrumbs$.asObservable();
  }



  _sortRecs(recs: Map<ActivatedRoute, IRecord>): IRecord[] {
    const items: IRecord[] = [];
    recs.forEach((r: IRecord) => items.push(r));
    items.sort((a: IRecord, b: IRecord) => {
      return a.url.length - b.url.length;
    });
    return items;
  }





  setRouteBreadcrumb(route: ActivatedRoute, templateRef: TemplateRef<any>, title: string) {
    const url = NgxRouteUtils.getSnapshotRouterLink(route);
    this._breadcrumbsMap.set(route, {route, templateRef, url, title});
    this._updateBreadcrumbs();
  }
  removeRouteBreadcrumb(route: ActivatedRoute) {
    this._breadcrumbsMap.delete(route);
    this._updateBreadcrumbs();
  }

  _updateBreadcrumbs() {
    const items = this._sortRecs(this._breadcrumbsMap);
    this._breadcrumbs$.next(items as ICrumb[]);
  }



}
