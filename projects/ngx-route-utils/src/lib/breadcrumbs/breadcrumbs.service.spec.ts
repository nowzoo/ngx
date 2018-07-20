import { TestBed, inject } from '@angular/core/testing';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgxRouteBreadcrumbsService } from './breadcrumbs.service';
import { NgxRouteUtils } from '../utils';

describe('NgxRouteBreadcrumbsService', () => {
  let router: any;
  let service: NgxRouteBreadcrumbsService;
  let snapshotsSpy;
  let result;
  let observedChangeCount;
  beforeEach(() => {
    snapshotsSpy = spyOn(NgxRouteUtils, 'currentRouteSnapshots').and.returnValue([]);
    router = {events: new Subject()};
    observedChangeCount = 0;
    TestBed.configureTestingModule({
      providers: [
        NgxRouteBreadcrumbsService,
        {provide: Router, useValue: router}
      ]
    });
    service = TestBed.get(NgxRouteBreadcrumbsService);
    service.breadcrumbs.subscribe(v => {
      result = v;
      observedChangeCount ++;
    });
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor', () => {
    it('should init breadcrumbs', () => {
      expect(service.breadcrumbs).toBeTruthy();
    });
    it('should respond to ActivationEnd events', () => {
      expect(observedChangeCount).toBe(1);
      const e = new ActivationEnd({} as any);
      router.events.next(e);
      expect(observedChangeCount).toBe(2);
    });
    it('should respond changes to registered breadcrumbs', () => {
      expect(observedChangeCount).toBe(1);
      const route = new ActivatedRoute();
      service.registerBreadcrumb(route, 'Home');
      expect(observedChangeCount).toBe(2);
    });
  });

  describe('expectations', () => {
    it('should be an empty array at first', () => {
      expect(result).toEqual([]);
    });
    it('should be an array of one if we register a breadcrumb for a route in the tree', () => {
      const homeSnap: any = {url: []};
      snapshotsSpy.and.returnValue([homeSnap]);
      service.registerBreadcrumb(homeSnap, 'Home');
      expect(result).toEqual([{url: '/', title: 'Home'}]);
    });
    it('should be an ignore routes in the tree that have not been registered as breadcrumbs', () => {
      const homeSnap: any = {url: []};
      const parentRoute: any = {url: []};
      const aboutRoute: any = {url: [{path: 'about'}]};
      snapshotsSpy.and.returnValue([homeSnap, parentRoute, aboutRoute]);
      service.registerBreadcrumb(homeSnap, 'Home');
      service.registerBreadcrumb(aboutRoute, 'About');
      expect(result).toEqual([{url: '/', title: 'Home'}, {url: '/about', title: 'About'}]);
    });
    it('should update the breadcrumb for a route', () => {
      const homeSnap: any = {url: []};
      const parentRoute: any = {url: []};
      const aboutRoute: any = {url: [{path: 'about'}]};
      snapshotsSpy.and.returnValue([homeSnap, parentRoute, aboutRoute]);
      service.registerBreadcrumb(homeSnap, 'Home');
      service.registerBreadcrumb(aboutRoute, 'About');
      expect(result).toEqual([{url: '/', title: 'Home'}, {url: '/about', title: 'About'}]);
      service.registerBreadcrumb(aboutRoute, 'AboutFoo');
      expect(result).toEqual([{url: '/', title: 'Home'}, {url: '/about', title: 'AboutFoo'}]);
    });

    it('should be an ignore routes that have been registered as breadcrumbs but are not in the tree', () => {
      const homeSnap: any = {url: []};
      const parentRoute: any = {url: []};
      const aboutRoute: any = {url: [{path: 'about'}]};
      const fooRoute: any = {url: [{path: 'foo'}]};
      snapshotsSpy.and.returnValue([homeSnap, parentRoute, aboutRoute]);
      service.registerBreadcrumb(homeSnap, 'Home');
      service.registerBreadcrumb(aboutRoute, 'About');
      service.registerBreadcrumb(fooRoute, 'Foo');
      expect(result).toEqual([{url: '/', title: 'Home'}, {url: '/about', title: 'About'}]);
    });
  });




});
