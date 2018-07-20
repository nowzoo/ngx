import { NgxRouteUtils } from './utils';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

describe('Utils', () => {
  it('should create an instance', () => {
    expect(new NgxRouteUtils()).toBeTruthy();
  });

  describe('urlFromRoute(route)', () => {
    it('should get rid of any empty segments within a route', () => {
      const snap: any = {url: [{path: 'foo'}, {path: ''}, {path: 'bar'}], parent: null};
      expect(NgxRouteUtils.urlFromRoute(snap)).toBe('/foo/bar');
    });
    it('should get rid of any empty segments in the parents', () => {
      const snap: any = {
        url: [{path: 'foo'}], parent: {
          url: [{path: ''}], parent: {
            url: [{path: 'bar'}]
          }
        }};
      expect(NgxRouteUtils.urlFromRoute(snap)).toBe('/bar/foo');
    });
    it('should get rid of any empty routes in the parents', () => {
      const snap: any = {
        url: [{path: 'foo'}], parent: {
          url: [], parent: {
            url: [{path: 'bar'}]
          }
        }};
      expect(NgxRouteUtils.urlFromRoute(snap)).toBe('/bar/foo');
    });
    it('should be able to deal with ActivatedRoute', () => {
      const activatedRoute = new ActivatedRoute();
      expect(NgxRouteUtils.urlFromRoute(activatedRoute)).toBe('/');
    });
    it('should be able to deal with ActivatedRouteSnapshot', () => {
      const activatedRoute = new ActivatedRoute();
      expect(NgxRouteUtils.urlFromRoute(activatedRoute.snapshot)).toBe('/');
    });

  });

  describe('currentRouteSnapshots(router)', () => {
    it('should get return all the route snaphots in order', () => {
      const childSnap = {children: []};
      const parentSnap = {children: [childSnap]};
      const grandparentSnap = {children: [parentSnap]};
      const rootSnap = {children: [grandparentSnap]};
      const router: any = {routerState: {root: {snapshot: rootSnap}}};
      expect(NgxRouteUtils.currentRouteSnapshots(router)).toEqual([rootSnap, grandparentSnap, parentSnap, childSnap] as any[]);
    });
  });
});
