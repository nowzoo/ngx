import { NgxBootstrapPopoverDirective } from './ngx-bootstrap-popover.directive';

describe('NgxBootstrapPopoverDirective', () => {
  let el: HTMLElement;
  let elementRef;
  let cfr: any;
  let vcr: any;
  let sanitizer: any;
  let directive: NgxBootstrapPopoverDirective;

  beforeEach(() => {
    el = document.createElement('button');
    elementRef = {nativeElement: el};
    cfr = {};
    vcr = {};
    sanitizer = { sanitize: jasmine.createSpy().and.callFake(val => val) };
    directive = new NgxBootstrapPopoverDirective(elementRef, cfr, vcr, sanitizer, {});
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  describe('getters', () => {
    it('should have popupType', () => {
      expect(directive.popupType).toBe('popover');
    });
    it('should have content', () => {
      expect(directive.content).toBe(null);
      directive.popoverContent = 'foo';
      expect(directive.content).toBe('foo');


    });
    it('should have title', () => {
      expect(directive.title).toBe(null);
      directive.popoverTitle = 'foo';
      expect(directive.title).toBe('foo');

    });
    it('should have dismissOnClickOutside', () => {
      expect(directive.dismissOnClickOutside).toBe(true);
      directive.popoverDismissOnClickOutside = false;
      expect(directive.dismissOnClickOutside).toBe(false);

    });
    it('should have enabled', () => {
      expect(directive.enabled).toBe(true);
      directive.popoverEnabled = false;
      expect(directive.enabled).toBe(false);
    });
    it('should have options', () => {
      expect(directive.options).toBe(null);
      directive.popoverOptions = {animation: true};
      expect(directive.options.animation).toBe(true);
    });
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      spyOn(directive, 'updateEnabled');
      spyOn(directive, 'updateContent');
      spyOn(directive, 'updateTitle');
    });
    it('should call updateEnabled if changes contains popoverEnabled', () => {
      directive.ngOnChanges({popoverEnabled: true} as any);
      expect(directive.updateEnabled).toHaveBeenCalled();
    });
    it('should not call updateEnabled if changes does not have popoverEnabled', () => {
      directive.ngOnChanges({foo: true} as any);
      expect(directive.updateEnabled).not.toHaveBeenCalled();
    });
    it('should call updateTitle if changes contains popoverTitle', () => {
      directive.ngOnChanges({popoverTitle: true} as any);
      expect(directive.updateTitle).toHaveBeenCalled();
    });
    it('should not call updateTitle if changes does not have popoverTitle', () => {
      directive.ngOnChanges({foo: true} as any);
      expect(directive.updateTitle).not.toHaveBeenCalled();
    });
    it('should call updateContent if changes contains popoverContent', () => {
      directive.ngOnChanges({popoverContent: true} as any);
      expect(directive.updateContent).toHaveBeenCalled();
    });
    it('should not call updateContent if changes does not have popoverContent', () => {
      directive.ngOnChanges({foo: true} as any);
      expect(directive.updateContent).not.toHaveBeenCalled();
    });
  });
});
