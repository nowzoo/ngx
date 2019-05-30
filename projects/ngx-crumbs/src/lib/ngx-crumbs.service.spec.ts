import { TestBed } from '@angular/core/testing';

import { NgxCrumbsService } from './ngx-crumbs.service';
import { ActivatedRoute } from '@angular/router';
import { ICrumb } from './api';
import { NgxRouteUtils } from '@nowzoo/ngx-route-utils';

describe('NgxCrumbsService', () => {
  let service: NgxCrumbsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxCrumbsService
      ]
    });
    service = TestBed.get(NgxCrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have crumbs$', () => {
    expect(service.crumbs$).toBeTruthy();
  });

  describe('_sortRecs', () => {
    it('should sort em', () => {
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

  describe('setRouteBreadcrumb(route: ActivatedRoute, templateRef: TemplateRef<any>, title: string)', () => {
    let route: ActivatedRoute;
    let templateRef: any;
    let getSnapshotRouterLinkSpy: jasmine.Spy;
    let _updateBreadcrumbsSpy: jasmine.Spy;
    let breadcrumbs: ICrumb[];
    beforeEach(() => {
      route = new ActivatedRoute();
      templateRef = {};
      getSnapshotRouterLinkSpy = spyOn(NgxRouteUtils, 'getSnapshotRouterLink').and.callFake(() => ['/', 'foo']);
      _updateBreadcrumbsSpy = spyOn(service, '_updateBreadcrumbs').and.callThrough();
      service.crumbs$.subscribe(v => breadcrumbs = v);
    });
    it('should call NgxRouteUtils.getSnapshotRouterLink(route)', () => {
      service.setRouteBreadcrumb(route, templateRef, 'foo');
      expect(getSnapshotRouterLinkSpy).toHaveBeenCalledWith(route);
    });
    it('should add the entry', () => {
      service.setRouteBreadcrumb(route, templateRef, 'abc');
      expect(breadcrumbs[0]).toEqual({
        title: 'abc',
        templateRef,
        route,
        url: ['/', 'foo']
      });
    });
    it('should call service._updateBreadcrumbs()', () => {
      service.setRouteBreadcrumb(route, templateRef, 'abc');
      expect(_updateBreadcrumbsSpy).toHaveBeenCalledWith();
    });

  });
  describe('removeRouteBreadcrumb(route: ActivatedRoute)', () => {
    let route: ActivatedRoute;
    let templateRef: any;
    let getSnapshotRouterLinkSpy: jasmine.Spy;
    let _updateBreadcrumbsSpy: jasmine.Spy;
    let breadcrumbs: ICrumb[];
    beforeEach(() => {
      route = new ActivatedRoute();
      templateRef = {};
      getSnapshotRouterLinkSpy = spyOn(NgxRouteUtils, 'getSnapshotRouterLink').and.callFake(() => ['/', 'foo']);
      _updateBreadcrumbsSpy = spyOn(service, '_updateBreadcrumbs').and.callThrough();
      service.crumbs$.subscribe(v => breadcrumbs = v);
      service.setRouteBreadcrumb(route, templateRef, 'abc');
      expect(breadcrumbs[0]).toEqual({
        title: 'abc',
        templateRef,
        route,
        url: ['/', 'foo']
      });
    });

    it('should remove the entry', () => {
      service.removeRouteBreadcrumb(route);
      expect(breadcrumbs[0]).toBeUndefined();
    });
    it('should call service._updateBreadcrumbs()', () => {
      service.removeRouteBreadcrumb(route);
      expect(_updateBreadcrumbsSpy).toHaveBeenCalledWith();
    });

  });
});
