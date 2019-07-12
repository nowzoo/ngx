import { NgxBootstrapTooltipDirective } from './ngx-bootstrap-tooltip.directive';

describe('NgxBootstrapTooltipDirective', () => {
  let el: HTMLElement;
  let elementRef: any;
  let cfr: any;
  let vcr: any;
  let directive: NgxBootstrapTooltipDirective;
  let sanitizer: any;

  beforeEach(() => {
    el = document.createElement('button');
    elementRef = {nativeElement: el};
    cfr = {};
    vcr = {};
    sanitizer = {sanitize: jasmine.createSpy().and.callFake(val => val)};
    directive = new NgxBootstrapTooltipDirective(elementRef, cfr, vcr, sanitizer);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  describe('getters', () => {
    it('should have popupType', () => {
      expect(directive.popupType).toBe('tooltip');
    });
    it('should not have content', () => {
      expect(directive.content).toBe(null);

    });
    it('should have title', () => {
      expect(directive.title).toBe(null);
      directive.tooltipTitle = 'foo';
      expect(directive.title).toBe('foo');

    });
    it('should have dismissOnClickOutside', () => {
      expect(directive.dismissOnClickOutside).toBe(true);
      directive.tooltipDismissOnClickOutside = false;
      expect(directive.dismissOnClickOutside).toBe(false);

    });
    it('should have enabled', () => {
      expect(directive.enabled).toBe(true);
      directive.tooltipEnabled = false;
      expect(directive.enabled).toBe(false);
    });
    it('should have options', () => {
      expect(directive.options).toBe(null);
      directive.tooltipOptions = {animation: true};
      expect(directive.options.animation).toBe(true);
    });
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      spyOn(directive, 'updateEnabled');
      spyOn(directive, 'updateContent');
      spyOn(directive, 'updateTitle');
    });
    it('should call updateEnabled if changes contains tooltipEnabled', () => {
      directive.ngOnChanges({tooltipEnabled: true} as any);
      expect(directive.updateEnabled).toHaveBeenCalled();
    });
    it('should not call updateEnabled if changes does not have tooltipEnabled', () => {
      directive.ngOnChanges({foo: true} as any);
      expect(directive.updateEnabled).not.toHaveBeenCalled();
    });
    it('should call updateTitle if changes contains tooltipTitle', () => {
      directive.ngOnChanges({tooltipTitle: true} as any);
      expect(directive.updateTitle).toHaveBeenCalled();
    });
    it('should not call updateTitle if changes does not have tooltipTitle', () => {
      directive.ngOnChanges({foo: true} as any);
      expect(directive.updateTitle).not.toHaveBeenCalled();
    });

  });
});
