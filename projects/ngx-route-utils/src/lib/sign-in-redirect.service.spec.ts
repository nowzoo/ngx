import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NgxSignInRedirectService } from './sign-in-redirect.service';

describe('NgxSignInRedirectService', () => {
  let router;
  let service: NgxSignInRedirectService;
  let getSpy;
  beforeEach(() => {
    router = {navigateByUrl: jasmine.createSpy()};
    spyOn(window.sessionStorage, 'setItem').and.callFake(() => {});
    spyOn(window.sessionStorage, 'removeItem').and.callFake(() => {});
    getSpy = spyOn(window.sessionStorage, 'getItem').and.callFake(() => {});
    TestBed.configureTestingModule({
      providers: [
        NgxSignInRedirectService,
        {provide: Router, useValue: router}
      ]
    });
    service = TestBed.get(NgxSignInRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('redirect getter', () => {
    it('should return null if the storage is null', () => {
      getSpy.and.returnValue(null);
      expect(service.redirect).toBe(null);
      expect(getSpy).toHaveBeenCalledWith(NgxSignInRedirectService.key);
    });
    it('should return string if the storage is string', () => {
      getSpy.and.returnValue('/foo');
      expect(service.redirect).toBe('/foo');
      expect(getSpy).toHaveBeenCalledWith(NgxSignInRedirectService.key);
    });
  });

  describe('redirect setter', () => {
    it('should remove if passed null', () => {
      service.redirect = null;
      expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(NgxSignInRedirectService.key);
    });
    it('should set if passed string', () => {
      service.redirect = '/foo';
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(NgxSignInRedirectService.key, '/foo');
    });
  });

  describe('redirectOnSignIn(default?)', () => {
    it('should call the getter', () => {
      service.redirectOnSignIn();
      expect(getSpy).toHaveBeenCalledWith(NgxSignInRedirectService.key);
    });
    it('should call router.navigateByUrl', () => {
      getSpy.and.returnValue('/foo');
      service.redirectOnSignIn();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/foo');
    });
    it('should call router.navigateByUrl with the arg if no redirect has been set', () => {
      getSpy.and.returnValue(null);
      service.redirectOnSignIn('/bar');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/bar');
    });
    it('should call router.navigateByUrl with / if no redirect has been set and no default arg', () => {
      getSpy.and.returnValue(null);
      service.redirectOnSignIn();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
