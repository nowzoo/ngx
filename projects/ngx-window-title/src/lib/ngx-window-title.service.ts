import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGX_WINDOW_TITLE_SEPARATOR } from './separator';

@Injectable({
  providedIn: 'root'
})
export class NgxWindowTitleService {
  private _appTitle: string = null;
  private _routeTitle: string = null;
  private _fullTitle: string = null;
  constructor(
    private title: Title,
    @Inject(NGX_WINDOW_TITLE_SEPARATOR) private sep: string
  ) { }


  updateWindowTitle() {
    const parts: string[] = [];
    if (this._routeTitle) {
      parts.push(this._routeTitle);
    }
    if (this._appTitle) {
      parts.push(this._appTitle);
    }
    this._fullTitle = parts.join(this.sep);
    this.title.setTitle(this.fullTitle);
  }

  set appTitle(t: string) {
    this._appTitle = t;
    this.updateWindowTitle();
  }

  get appTitle(): string {
    return this._appTitle;
  }

  set routeTitle(t: string) {
    this._routeTitle = t;
    this.updateWindowTitle();
  }

  get routeTitle(): string {
    return this._routeTitle;
  }

  get fullTitle(): string {
    return this._fullTitle;
  }
}
