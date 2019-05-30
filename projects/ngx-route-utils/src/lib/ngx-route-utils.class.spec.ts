import { TestBed } from '@angular/core/testing';

import { NgxRouteUtils } from './ngx-route-utils.class';
import { ActivatedRoute } from '@angular/router';

describe('NgxRouteUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe('getSnapshotRouterLink(route)', () => {
    it('should work with a snapshot', () => {
      const snap: any = {pathFromRoot: [
        {url: [{path: 'foo'}]}, {url: [{path: 'bar'}]}
      ]};
      expect(NgxRouteUtils.getSnapshotRouterLink(snap)).toEqual(['/', 'foo', 'bar']);
    });
    it('should work with an ActivatedRoute', () => {
      const route: ActivatedRoute = new ActivatedRoute();
      const snap: any = {pathFromRoot: [
        {url: [{path: 'foo'}]}, {url: [{path: 'bar'}]}
      ]};
      route.snapshot = snap;
      expect(NgxRouteUtils.getSnapshotRouterLink(route)).toEqual(['/', 'foo', 'bar']);
    });
  });

});
