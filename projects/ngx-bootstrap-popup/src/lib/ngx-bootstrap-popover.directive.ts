import {
  Directive,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  TemplateRef,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

import { NgxBootstrapPopup } from './ngx-bootstrap-popup';
import { IPopupOptions } from './shared';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[ngxBootstrapPopover]'
})
export class NgxBootstrapPopoverDirective extends NgxBootstrapPopup implements OnInit, OnChanges, OnDestroy {
  @Input() popoverTitle: string | TemplateRef<any>;
  @Input() popoverContent: string | TemplateRef<any>;
  @Input() popoverEnabled = true;
  @Input() popoverDismissOnClickOutside = true;
  @Input() popoverOptions: IPopupOptions;
  @Output() popoverEvents: EventEmitter<Event>;

  constructor(
    elementRef: ElementRef,
    cfr: ComponentFactoryResolver,
    vcr: ViewContainerRef,
    sanitizer: DomSanitizer
  ) {
    super(elementRef, cfr, vcr, sanitizer);
    this.popoverEvents = this.events;
  }
  get popupType(): 'popover' | 'tooltip' {
    return 'popover';
  }
  get content(): string | TemplateRef<any> {
    return this.popoverContent || null;
  }
  get title(): string | TemplateRef<any>  {
      return this.popoverTitle || null;
  }

  get dismissOnClickOutside(): boolean {
    return this.popoverDismissOnClickOutside;
  }

  get enabled(): boolean {
    return this.popoverEnabled;
  }

  get options(): IPopupOptions {
    return this.popoverOptions || null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.popoverEnabled !== undefined) {
      this.updateEnabled();
    }
    if (changes.popoverTitle) {
      this.updateTitle();
    }
    if (changes.popoverContent) {
      this.updateContent();
    }
  }
}
