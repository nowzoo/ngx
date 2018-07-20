import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxRouteUtils } from '../utils';

export interface INgxRouteBreadcrumb {
  title: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class NgxRouteBreadcrumbsService {

  private _breadcrumbs$: BehaviorSubject<INgxRouteBreadcrumb[]> = new BehaviorSubject([]);
  private _registered$: BehaviorSubject<{[url: string]: string}> = new BehaviorSubject({});
  constructor(
    private router: Router
  ) {
    this._init();
  }

  get breadcrumbs(): Observable<INgxRouteBreadcrumb[]> {
    return this._breadcrumbs$.asObservable();
  }

  registerBreadcrumb(route: ActivatedRoute|ActivatedRouteSnapshot, title: string) {
    const url = NgxRouteUtils.urlFromRoute(route);
    const registered = this._registered$.value;
    registered[url] = title;
    this._registered$.next(registered);
  }

  private _init() {
    this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this._updateBreadcrumbs());
    this._registered$.asObservable()
      .subscribe(() => this._updateBreadcrumbs());
  }

  private _updateBreadcrumbs() {
    const currentSnapshots = NgxRouteUtils.currentRouteSnapshots(this.router);
    const breadcrumbs: INgxRouteBreadcrumb[] = [];
    const registered = this._registered$.value;
    currentSnapshots.forEach((snapshot: ActivatedRouteSnapshot) => {
      const url = NgxRouteUtils.urlFromRoute(snapshot);
      if (registered[url] && (! breadcrumbs.find(o => url === o.url))) {
        breadcrumbs.push({url: url, title: registered[url]});
      }
    });
    this._breadcrumbs$.next(breadcrumbs);
  }
}
