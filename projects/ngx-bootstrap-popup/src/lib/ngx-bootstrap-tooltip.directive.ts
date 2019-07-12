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
  Optional,
  Inject
} from '@angular/core';
import { NgxBootstrapPopup } from './ngx-bootstrap-popup';
import { IPopupOptions, NGX_BOOTSTRAP_POPUP_OPTIONS } from './shared';
import { DomSanitizer } from '@angular/platform-browser';
@Directive({
  selector: '[ngxBootstrapTooltip]',
  exportAs: 'ngxBootstrapTooltip'
})
export class NgxBootstrapTooltipDirective extends NgxBootstrapPopup implements OnInit, OnChanges, OnDestroy {
  @Input() tooltipTitle: string | TemplateRef<any>;
  @Input() tooltipEnabled = true;
  @Input() tooltipDismissOnClickOutside = true;
  @Input() tooltipOptions: IPopupOptions;
  @Output() tooltipEvents: EventEmitter<Event>;

  constructor(
    elementRef: ElementRef,
    cfr: ComponentFactoryResolver,
    vcr: ViewContainerRef,
    sanitizer: DomSanitizer,
    @Optional() @Inject(NGX_BOOTSTRAP_POPUP_OPTIONS) defaultOptions: IPopupOptions

  ) {
    super(elementRef, cfr, vcr, sanitizer, defaultOptions || {});
    this.tooltipEvents = this.events;
  }
  get popupType(): 'popover' | 'tooltip' {
    return 'tooltip';
  }
  get content(): string | TemplateRef<any> {
    return null;
  }
  get title(): string | TemplateRef<any>  {
    return this.tooltipTitle || null;
  }

  get dismissOnClickOutside(): boolean {
    return this.tooltipDismissOnClickOutside;
  }

  get enabled(): boolean {
    return this.tooltipEnabled;
  }

  get options(): IPopupOptions {
    return this.tooltipOptions || null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tooltipEnabled !== undefined) {
      this.updateEnabled();
    }
    if (changes.tooltipTitle) {
      this.updateTitle();
    }
  }
}
