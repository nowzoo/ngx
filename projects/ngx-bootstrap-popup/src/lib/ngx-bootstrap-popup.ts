import {
  OnInit,
  OnDestroy,
  EventEmitter,
  TemplateRef,
  ElementRef,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxBootstrapPopupPlaceholderComponent } from './ngx-bootstrap-popup-placeholder.component';

import { IPopupOptions } from './shared';

declare const jQuery: any;

export abstract class NgxBootstrapPopup implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject();
  protected events: EventEmitter<Event>;
  private _showing = false;
  private _titleComponentRef: ComponentRef<NgxBootstrapPopupPlaceholderComponent>;
  private _contentComponentRef: ComponentRef<NgxBootstrapPopupPlaceholderComponent>;

  abstract popupType: 'popover' | 'tooltip';
  abstract title: string | TemplateRef<any>;
  abstract content: string | TemplateRef<any>;
  abstract options: IPopupOptions;
  abstract enabled: boolean;
  abstract dismissOnClickOutside: boolean;

  get titleComponentRef(): ComponentRef<NgxBootstrapPopupPlaceholderComponent> {
    return this._titleComponentRef;
  }
  get contentComponentRef(): ComponentRef<NgxBootstrapPopupPlaceholderComponent> {
    return this._contentComponentRef;
  }
  bsEventListener: any;
  clickDismissListener: any = null;

  constructor(
    private _elementRef: ElementRef,
    private _cfr: ComponentFactoryResolver,
    private _vcr: ViewContainerRef
  ) {
    this.events = new EventEmitter();
  }

  get cfr(): ComponentFactoryResolver {
    return this._cfr;
  }

  get vcr(): ViewContainerRef {
    return this._vcr;
  }

  get el(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get $el(): any {
    return jQuery(this.el);
  }

  get bsInstance(): any {
    return this.$el.data('bs.' + this.popupType);
  }

  get showing(): boolean {
    return this._showing;
  }

  get jQueryEvents(): string {
    return ['show', 'inserted', 'shown', 'hide', 'hidden'].map((t => `${t}.bs.${this.popupType}`)).join(' ');
  }

  ngOnInit() {
    this.create();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
    this.$el[this.popupType]('dispose');
    this.$el.off(this.jQueryEvents, this.bsEventListener);
    if (this.clickDismissListener) {
      jQuery('body').off('click focusin', this.clickDismissListener);
    }
    if (this.titleComponentRef) {
      this.titleComponentRef.destroy();
    }
    if (this.contentComponentRef) {
      this.contentComponentRef.destroy();
    }
  }

  create() {
    this.bsEventListener = ((event: Event) => {
      if (this.dismissOnClickOutside && event.type === 'shown') {
        this.clickDismissListener = ((clickEvent: Event) => {
          if (this.bsInstance.tip.contains(clickEvent.target)) {
            return;
          }
          jQuery('body').off('click focusin', this.clickDismissListener);
          this.clickDismissListener = null;
          this.hide();
        });
        jQuery('body').on('click focusin', this.clickDismissListener);
      }
      if (event.type === 'show') {
        this._showing = true;
      }
      if (event.type === 'hidden') {
        jQuery('body').off('click focusin', this.clickDismissListener);
        this.clickDismissListener = null;
        this._showing = false;
      }
      this.events.emit(event);
    });
    this.$el.on(this.jQueryEvents, this.bsEventListener);
    const options = this.getOptions();
    this.$el[this.popupType](options);
    this.updateEnabled();
  }

  getOptions(): any {
    const options: any = Object.assign({}, this.options);
    if (this.title) {
      this._titleComponentRef = this.getPlaceholderComponent();
      this.titleComponentRef.instance.inserted = this.title;
      options.title = this.titleComponentRef.instance.insertedContent.nativeElement;
      options.html = true;
      options.sanitize = false;
    }
    if (this.content) {
      this._contentComponentRef = this.getPlaceholderComponent();
      this.contentComponentRef.instance.inserted = this.content;
      options.content = this.contentComponentRef.instance.insertedContent.nativeElement;
      options.html = true;
      options.sanitize = false;
      options.sanitizeFn = null;
    }
    return options;
  }

  getPlaceholderComponent(): ComponentRef<NgxBootstrapPopupPlaceholderComponent> {
    const factory = this.cfr.resolveComponentFactory(NgxBootstrapPopupPlaceholderComponent);
    const ref = this.vcr.createComponent(factory, 0);
    ref.instance.contentChanged
    .pipe(takeUntil(this._ngUnsubscribe))
    .subscribe(() => {
      if (this.showing) {
        this.update();
      }
    });
    return ref;
  }

  show() {
      this.$el[this.popupType]('show');
  }

  hide() {
    this.$el[this.popupType]('hide');
  }


  toggle() {
    this.$el[this.popupType]('toggle');
  }

  enable() {
    this.$el[this.popupType]('enable');
  }


  disable() {
    this.$el[this.popupType]('disable');
  }

  toggleEnabled() {
    this.$el[this.popupType]('toggleEnabled');
  }

  update() {
    this.$el[this.popupType]('update');
  }


  updateTitle() {
    if (this.titleComponentRef && this.title) {
      this.titleComponentRef.instance.inserted = this.title;
    }
  }
  updateContent() {
    if (this.contentComponentRef && this.content) {
      this.contentComponentRef.instance.inserted = this.content;
    }
  }
  updateEnabled() {
    if (this.bsInstance) {
      if (this.enabled) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }

}
