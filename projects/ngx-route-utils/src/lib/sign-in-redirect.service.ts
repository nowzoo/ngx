import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    if (val) {
      window.sessionStorage.setItem(NgxSignInRedirectService.key, val);
    } else {
      window.sessionStorage.removeItem(NgxSignInRedirectService.key);
    }
  }

  redirectOnSignIn(defaultRedirect = '/'): Promise<boolean> {
    const redirect = this.redirect || defaultRedirect;
    this.redirect = null;
    return this.router.navigateByUrl(redirect);
  }
}
