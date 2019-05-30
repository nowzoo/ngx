import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { INgxSignInRedirectConfig, NGX_SIGN_IN_REDIRECT_CONFIG, NGX_SIGN_IN_DEFAULT_CONFIG} from './api';
import { NgxRouteUtils } from '@nowzoo/ngx-route-utils';

@Injectable({
  providedIn: 'root'
})
export class NgxSignInRedirectService {
  constructor(
    @Inject(NGX_SIGN_IN_REDIRECT_CONFIG) private _config: INgxSignInRedirectConfig,
    private _router: Router
  ) { }

  get router(): Router {
    return this._router;
  }
  get storage(): Storage {
    return window.sessionStorage;
  }

  get config(): INgxSignInRedirectConfig {
    return Object.assign({}, NGX_SIGN_IN_DEFAULT_CONFIG, this._config);
  }

  saveRedirect(url: string[]) {
    if (url) {
      this.storage.setItem(this.config.storageKey, JSON.stringify(url));
    } else {
      this.storage.removeItem(this.config.storageKey);
    }
  }

  get redirect(): string[] {
    const json = this.storage.getItem(this.config.storageKey);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }

  redirectOnSignIn() {
    const redirect = this.redirect || [this.config.defaultRedirect];
    this.saveRedirect(null);
    this.router.navigate(redirect);
  }

  setRedirect(route: ActivatedRoute|ActivatedRouteSnapshot, signInUrl?: string) {
    const url = NgxRouteUtils.getSnapshotRouterLink(route);
    this.saveRedirect(url);
    if (signInUrl) {
      this.router.navigateByUrl(signInUrl);
    }
  }

  clearRedirect() {
    this.saveRedirect(null);
  }
}
