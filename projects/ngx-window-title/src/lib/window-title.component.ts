/* tslint:disable:no-unused-variable */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IWindowTitle, WindowTitleContext } from './api';
import { Title } from '@angular/platform-browser';
import { NgxWindowTitleService } from './ngx-window-title.service';

@Component({
  selector: 'ngx-window-title',
  templateUrl: './window-title.component.html',
  styles: []
})
export class WindowTitleComponent implements OnInit, OnDestroy {
  private _unsub: Subject<void> = new Subject();

  @ViewChild('app', {static: false}) appElementRef: {nativeElement: any};
  @ViewChild('route', {static: false}) routeElementRef: {nativeElement: any};
  @Input() separator = ' | ';
  @Input() appFirst = false;


  appTemplate: TemplateRef<any> = null;
  routeTemplate: TemplateRef<any> = null;

  constructor(
    private _service: NgxWindowTitleService,
    private _titleService: Title
  ) { }

  get service(): NgxWindowTitleService {
    return this._service;
  }

  get titleService(): Title {
    return this._titleService;
  }

  get routeEl(): HTMLDivElement {
    return this.routeElementRef.nativeElement;
  }

  get appEl(): HTMLDivElement {
    return this.appElementRef.nativeElement;
  }

  ngOnInit() {
    this.service.windowTitles$
      .pipe(takeUntil(this._unsub))
      .subscribe((recs: IWindowTitle[]) => {
        this.updateTemplates(recs);
      });
  }

  ngOnDestroy() {
    this._unsub.next();
    this._unsub.complete();
  }

  updateTemplates(recs: IWindowTitle[]) {
    const appRecs = recs.filter(rec => WindowTitleContext.app === rec.context);
    if (appRecs.length > 0) {
      this.appTemplate = appRecs[appRecs.length - 1].templateRef;
    } else {
      this.appTemplate = null;
    }
    const routeRecs = recs.filter(rec => WindowTitleContext.route === rec.context);
    if (routeRecs.length > 0) {
      this.routeTemplate = routeRecs[routeRecs.length - 1].templateRef;
    } else {
      this.routeTemplate = null;
    }
  }

  onContentChange() {
    const parts = [this.routeEl.innerText.trim(), this.appEl.innerText.trim()]
      .filter(s => s.length > 0);
    if (this.appFirst) {
      parts.reverse();
    }
    this.titleService.setTitle(parts.join(this.separator));
  }

}
