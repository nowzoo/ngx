import { TestBed } from '@angular/core/testing';

import { NgxWindowTitleService } from './ngx-window-title.service';
import { IWindowTitle } from 'ngx-crumbs/lib/api';
import { ActivatedRoute } from '@angular/router';
import { NgxRouteUtils } from '@nowzoo/ngx-route-utils';
import { WindowTitleContext } from './api';
import { take } from 'rxjs/operators';

describe('NgxWindowTitleService', () => {
  let service: NgxWindowTitleService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service =  TestBed.get(NgxWindowTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have windowTitles$', () => {
    expect(service.windowTitles$).toBeTruthy();
  });

  describe('_sortRecs', () => {
    it('should ', () => {
      const recs: any[] = [
        {url: ['/', 'foo']},
        {url: ['/', 'foo', 'bar']},
        {url: ['/']},
      ];
      const sorted = service._sortRecs(recs as any);
      expect(sorted[0].url).toEqual(['/']);
      expect(sorted[2].url).toEqual(['/', 'foo', 'bar']);
    });
  });

  describe('setWindowTitle(route: ActivatedRoute, templateRef: TemplateRef<any>, context: WindowTitleContext)', () => {
    let route: ActivatedRoute;
    let templateRef: any;
    let getSnapshotRouterLinkSpy: jasmine.Spy;
    let _updateWindowTitlesSpy: jasmine.Spy;
    let windowTitles: IWindowTitle[];
    beforeEach(() => {
      route = new ActivatedRoute();
      templateRef = {};
      getSnapshotRouterLinkSpy = spyOn(NgxRouteUtils, 'getSnapshotRouterLink').and.callFake(() => ['/', 'foo']);
      _updateWindowTitlesSpy = spyOn(service, '_updateWindowTitles').and.callThrough();
      service.windowTitles$.subscribe(v => windowTitles = v);
    });
    it('should call NgxRouteUtils.getSnapshotRouterLink(route)', () => {
      service.setWindowTitle(route, templateRef, WindowTitleContext.app);
      expect(getSnapshotRouterLinkSpy).toHaveBeenCalledWith(route);
    });
    it('should add the entry', () => {
      service.setWindowTitle(route, templateRef, WindowTitleContext.app);
      expect(windowTitles[0]).toEqual({
        context: WindowTitleContext.app,
        templateRef,
        route,
        url: ['/', 'foo']
      });
    });
    it('should call service._updateWindowTitles()', () => {
      service.setWindowTitle(route, templateRef, WindowTitleContext.app);
      expect(_updateWindowTitlesSpy).toHaveBeenCalledWith();
    });

  });
  describe('removeWindowTitle(route: ActivatedRoute)', () => {
    let route: ActivatedRoute;
    let templateRef: any;
    let getSnapshotRouterLinkSpy: jasmine.Spy;
    let _updateWindowTitlesSpy: jasmine.Spy;
    let windowTitles: IWindowTitle[];
    beforeEach(() => {
      route = new ActivatedRoute();
      templateRef = {};
      getSnapshotRouterLinkSpy = spyOn(NgxRouteUtils, 'getSnapshotRouterLink').and.callFake(() => ['/', 'foo']);
      _updateWindowTitlesSpy = spyOn(service, '_updateWindowTitles').and.callThrough();
      service.windowTitles$.subscribe(v => windowTitles = v);
      service.setWindowTitle(route, templateRef, WindowTitleContext.app);
      expect(windowTitles[0]).toEqual({
        context: WindowTitleContext.app,
        templateRef,
        route,
        url: ['/', 'foo']
      });
    });

    it('should remove the entry', () => {
      service.removeWindowTitle(route);
      expect(windowTitles[0]).toBeUndefined();
    });
    it('should call service._updateWindowTitles()', () => {
      service.removeWindowTitle(route);
      expect(_updateWindowTitlesSpy).toHaveBeenCalledWith();
    });

  });
});
