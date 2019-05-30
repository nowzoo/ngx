import { Injectable, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWindowTitle, WindowTitleContext } from './api';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxRouteUtils } from '@nowzoo/ngx-route-utils';


@Injectable({
  providedIn: 'root'
})
export class NgxWindowTitleService {
  private _windowTitlesMap: Map<ActivatedRoute, IWindowTitle> = new Map();
  private _windowTitles$: BehaviorSubject<IWindowTitle[]> = new BehaviorSubject([]);


  // constructor() {}

  get windowTitles$(): Observable<IWindowTitle[]> {
    return this._windowTitles$.asObservable();
  }


  _sortRecs(recs: Map<ActivatedRoute, IWindowTitle>): IWindowTitle[] {
    const items: IWindowTitle[] = [];
    recs.forEach((r: IWindowTitle) => items.push(r));
    items.sort((a: IWindowTitle, b: IWindowTitle) => {
      return a.url.length - b.url.length;
    });
    return items;
  }

  setWindowTitle(route: ActivatedRoute, templateRef: TemplateRef<any>, context: WindowTitleContext) {
    const url = NgxRouteUtils.getSnapshotRouterLink(route);
    this._windowTitlesMap.set(route, {route, templateRef, url, context});
    this._updateWindowTitles();
  }
  removeWindowTitle(route: ActivatedRoute) {
    this._windowTitlesMap.delete(route);
    this._updateWindowTitles();
  }
  _updateWindowTitles() {
    const items = this._sortRecs(this._windowTitlesMap);
    this._windowTitles$.next(items as IWindowTitle[]);
  }

}
