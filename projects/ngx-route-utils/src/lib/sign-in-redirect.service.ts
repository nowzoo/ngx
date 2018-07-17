import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgxRouteUtils } from './utils';
@Injectable({
  providedIn: 'root'
})
export class NgxSignInRedirectService {
  static key = 'ngx-sign-in-redirect';
  constructor(private router: Router) { }

  get redirect(): string {
    const val = window.sessionStorage.getItem(NgxSignInRedirectService.key);
    return val || null;
  }

  set redirect(val: string) {
    if (! val) {
      window.sessionStorage.removeItem(NgxSignInRedirectService.key);
    } else {
      window.sessionStorage.setItem(NgxSignInRedirectService.key, val);
    }
  }

  setRedirect(val: string|ActivatedRoute|ActivatedRouteSnapshot) {
    if (! val) {
      this.redirect = null;
      return;
    }
    this.redirect = typeof val === 'string' ? val : NgxRouteUtils.urlFromRoute(val);
  }

  redirectOnSignIn(defaultRedirect: string|ActivatedRoute|ActivatedRouteSnapshot = '/'): Promise<boolean> {
    defaultRedirect = typeof defaultRedirect === 'string' ? defaultRedirect : NgxRouteUtils.urlFromRoute(defaultRedirect);
    const redirect = this.redirect || defaultRedirect;
    this.setRedirect(null);
    return this.router.navigateByUrl(redirect);
  }
}
