import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { INgxSignInRedirectConfig, NGX_SIGN_IN_REDIRECT_CONFIG} from './api';

import { NgxSignInRedirectService } from './ngx-sign-in-redirect.service';
import { NgxRouteUtils } from '@nowzoo/ngx-route-utils';

describe('NgxSignInRedirectService', () => {
  let config: INgxSignInRedirectConfig;
  let service: NgxSignInRedirectService;
  let setItemSpy: jasmine.Spy;
  let removeItemSpy: jasmine.Spy;
  let getItemSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;
  let navigateByUrlSpy: jasmine.Spy;
  beforeEach(() => {
    setItemSpy = spyOn(window.sessionStorage, 'setItem');
    removeItemSpy = spyOn(window.sessionStorage, 'removeItem');
    getItemSpy = spyOn(window.sessionStorage, 'getItem');
    navigateSpy = jasmine.createSpy();
    navigateByUrlSpy = jasmine.createSpy();
    config = {
      defaultRedirect: '/',
      storageKey: 'foo-bar'
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: {navigate: navigateSpy, navigateByUrl: navigateByUrlSpy}},
        {provide: NGX_SIGN_IN_REDIRECT_CONFIG, useValue: config},
      ]
    });
    service = TestBed.get(NgxSignInRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have router', () => {
      expect(service.router).toBeTruthy();
    });
    it('should have storage', () => {
      expect(service.storage).toBeTruthy();
    });
    it('should have config', () => {
      expect(service.config).toEqual(config);
    });
    it('should have redirect', () => {
      getItemSpy.and.callFake(() => '["/", "foo"]');
      expect(service.redirect).toEqual(['/', 'foo']);
      getItemSpy.and.callFake(() => null);
      expect(service.redirect).toBe(null);
    });
  });

  describe('saveRedirect(url: string[])', () => {
    it('should call setItem if passed a string', () => {
      service.saveRedirect(['/', 'foo']);
      expect(setItemSpy).toHaveBeenCalledWith(config.storageKey, '["/","foo"]');
    });
    it('should call removeItem if passed null', () => {
      service.saveRedirect(null);
      expect(removeItemSpy).toHaveBeenCalledWith(config.storageKey);
    });



  });

  describe('redirectOnSignIn()', () => {
    it('should  navigate to the default url if redirect is null', () => {
      spyOnProperty(service, 'redirect').and.returnValue(null);
      service.redirectOnSignIn();
      expect(navigateSpy).toHaveBeenCalledWith([config.defaultRedirect]);
    });
    it('should navigate to the url if redirect has been set', () => {
      spyOnProperty(service, 'redirect').and.returnValue(['/']);
      service.redirectOnSignIn();
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });

  describe('setRedirect', () => {
    let activatedRoute: any;
    let urlSpy: jasmine.Spy;
    let saveSpy: jasmine.Spy;
    let url: string[];
    beforeEach(() => {
      saveSpy = spyOn(service, 'saveRedirect');
      url = ['/', 'foo', 'bar'];
      urlSpy = spyOn(NgxRouteUtils, 'getSnapshotRouterLink').and.callFake(() => url);
      activatedRoute = new ActivatedRoute();
    });
    it('should work with ActivatedRoute', () => {
      service.setRedirect(activatedRoute);
      expect(saveSpy).toHaveBeenCalledWith(url);
    });

    it('should redirect if a signInUrl is passed', () => {
      service.setRedirect(activatedRoute, '/sign-in');
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/sign-in');

    });
    describe(`clearRedirect()`, () => {
      it('should call saveRedirect', () => {
        service.clearRedirect();
        expect(saveSpy).toHaveBeenCalledWith(null);
      });
    });
  });


});
