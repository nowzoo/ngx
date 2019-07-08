import { NgxBootstrapPopup } from './ngx-bootstrap-popup';
import { Directive, EventEmitter } from '@angular/core';
import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';

@Directive({
  selector: '[ngxFakePopup]'
})
export class FakePopupDirective extends NgxBootstrapPopup  {

  get myEvents(): EventEmitter<Event> {
    return this.events;
  }
  get content() {
    return 'foo';
  }

  get title() {
    return 'foo';
  }

  get dismissOnClickOutside() {
    return true;
  }
  get enabled() {
    return true;
  }
  get options() {
    return null;
  }
  get popupType() {
    return 'popover' as 'popover';
  }
}

describe('NgxBootstrapPopup', () => {
  let directive: FakePopupDirective;
  let el: HTMLElement;
  let elementRef;
  let cfr: any;
  let vcr: any;
  (window as any).jQuery = jQuery;
  (window as any).bootstrap = bootstrap;
  beforeEach(() => {
    el = document.createElement('button');
    elementRef = {nativeElement: el};
    cfr = {};
    vcr = {};
    directive = new FakePopupDirective(elementRef, cfr, vcr);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('getters of constructor params and related', () => {
    it('should have cfr', () => {
      expect(directive.cfr).toBe(cfr);
    });
    it('should have vcr', () => {
      expect(directive.vcr).toBe(vcr);
    });
    it('should have el', () => {
      expect(directive.el).toBe(elementRef.nativeElement);
    });
    it('should have $el', () => {
      expect(directive.$el).toBeTruthy();
    });
    it('should have jQueryEvents', () => {
      expect(directive.jQueryEvents).toBeTruthy();
    });
    it('should have showing', () => {
      expect(directive.showing).toBe(false);
    });
    it('should have bsInstance', () => {
      const inst = {};
      const spy = jasmine.createSpy().and.callFake(() => inst);
      spyOnProperty(directive, '$el').and.returnValue({
        data: spy
      });
      expect(directive.bsInstance).toBe(inst);
      expect(spy).toHaveBeenCalledWith('bs.popover');
    });
  });

  describe('bootstrap functions', () => {
    let $fakeEl;
    beforeEach(() => {
      $fakeEl = {
        popover: jasmine.createSpy()
      };
      spyOnProperty(directive, '$el').and.returnValue($fakeEl);
    });
    describe('show()', () => {
      it('should call popover correctly', () => {
        directive.show();
        expect($fakeEl.popover).toHaveBeenCalledWith('show');
      });
    });
    describe('hide()', () => {
      it('should call popover correctly', () => {
        directive.hide();
        expect($fakeEl.popover).toHaveBeenCalledWith('hide');
      });
    });
    describe('toggle()', () => {
      it('should call popover correctly', () => {
        directive.toggle();
        expect($fakeEl.popover).toHaveBeenCalledWith('toggle');
      });
    });
    describe('enable()', () => {
      it('should call popover correctly', () => {
        directive.enable();
        expect($fakeEl.popover).toHaveBeenCalledWith('enable');
      });
    });
    describe('disable()', () => {
      it('should call popover correctly', () => {
        directive.disable();
        expect($fakeEl.popover).toHaveBeenCalledWith('disable');
      });
    });
    describe('toggleEnabled()', () => {
      it('should call popover correctly', () => {
        directive.toggleEnabled();
        expect($fakeEl.popover).toHaveBeenCalledWith('toggleEnabled');
      });
    });
    describe('update()', () => {
      it('should call popover correctly', () => {
        directive.update();
        expect($fakeEl.popover).toHaveBeenCalledWith('update');
      });
    });
  });

  describe('updateTitle()', () => {
    let compRef;
    beforeEach(() => {
      compRef = {instance: {}};
      spyOnProperty(directive, 'titleComponentRef').and.returnValue(compRef);
    });
    it('should set the inserted property of the titleComponentRef.instance', () => {
      spyOnProperty(directive, 'title').and.returnValue('foo bar');
      directive.updateTitle();
      expect(compRef.instance.inserted).toBe('foo bar');
    });
    it('should not set the inserted property of the titleComponentRef.instance if the title is null', () => {
      spyOnProperty(directive, 'title').and.returnValue(null);
      directive.updateTitle();
      expect(compRef.instance.inserted).toBe(undefined);
    });
  });

  describe('updateContent()', () => {
    let compRef;
    beforeEach(() => {
      compRef = {instance: {}};
      spyOnProperty(directive, 'contentComponentRef').and.returnValue(compRef);
    });
    it('should set the inserted property of the contentComponentRef.instance', () => {
      spyOnProperty(directive, 'content').and.returnValue('foo bar');
      directive.updateContent();
      expect(compRef.instance.inserted).toBe('foo bar');
    });
    it('should not set the inserted property of the contentComponentRef.instance if the content is null', () => {
      spyOnProperty(directive, 'content').and.returnValue(null);
      directive.updateContent();
      expect(compRef.instance.inserted).toBe(undefined);
    });
  });

  describe('updateEnabled', () => {
    beforeEach(() => {
      spyOn(directive, 'enable');
      spyOn(directive, 'disable');
    });
    it('should do nothing if bsInstance is not set', () => {
      spyOnProperty(directive, 'bsInstance').and.returnValue(undefined);
      directive.updateEnabled();
      expect(directive.enable).not.toHaveBeenCalled();
      expect(directive.disable).not.toHaveBeenCalled();
    });
    describe('if bsInstance', () => {
      beforeEach(() => {
        spyOnProperty(directive, 'bsInstance').and.returnValue({});
      });
      it('should call disable() if ! enabled', () => {
        spyOnProperty(directive, 'enabled').and.returnValue(false);
        directive.updateEnabled();
        expect(directive.enable).not.toHaveBeenCalled();
        expect(directive.disable).toHaveBeenCalled();
      });
      it('should call enable() if enabled', () => {
        spyOnProperty(directive, 'enabled').and.returnValue(true);
        directive.updateEnabled();
        expect(directive.enable).toHaveBeenCalled();
        expect(directive.disable).not.toHaveBeenCalled();
      });
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(directive, 'create');
    });
    it('should call create', () => {
      directive.ngOnInit();
      expect(directive.create).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy()', () => {
    let $el;

    beforeEach(() => {
      $el = {popover: jasmine.createSpy(), off: jasmine.createSpy()};
      spyOnProperty(directive, '$el').and.returnValue($el);
      directive.bsEventListener = () => {};
    });
    it('should call popover dispose', () => {
      directive.ngOnDestroy();
      expect($el.popover).toHaveBeenCalledWith('dispose');
    });
    it('should call off', () => {
      directive.ngOnDestroy();
      expect($el.off).toHaveBeenCalledWith(directive.jQueryEvents, directive.bsEventListener);
    });
    it('should unlisten to body clicks', () => {
      const spy = jasmine.createSpy();
      spyOn((window as any), 'jQuery').and.callFake(() => {
        return {off: spy};
      });
      const fn = () => {};
      directive.clickDismissListener = fn;
      directive.ngOnDestroy();
      expect(spy).toHaveBeenCalledWith('click focusin', directive.clickDismissListener);
    });

    it('should destroy titleComponentRef', () => {
      const ref = {destroy: jasmine.createSpy()};
      spyOnProperty(directive, 'titleComponentRef').and.returnValue(ref);
      directive.ngOnDestroy();
      expect(ref.destroy).toHaveBeenCalled();
    });
    it('should destroy contentComponentRef', () => {
      const ref = {destroy: jasmine.createSpy()};
      spyOnProperty(directive, 'contentComponentRef').and.returnValue(ref);
      directive.ngOnDestroy();
      expect(ref.destroy).toHaveBeenCalled();
    });
  });

  describe('getPlaceholderComponent()', () => {
    let placeholderRef;
    let placeholderInstance;
    let cfrMock;
    let vcrMock;
    beforeEach(() => {
      placeholderInstance = {contentChanged: new EventEmitter()};
      placeholderRef = {instance: placeholderInstance};
      cfrMock = { resolveComponentFactory: jasmine.createSpy()};
      spyOnProperty(directive, 'cfr').and.returnValue(cfrMock);
      vcrMock = {createComponent: jasmine.createSpy().and.callFake(() => placeholderRef)};
      spyOnProperty(directive, 'vcr').and.returnValue(vcrMock);

    });
    it('should work', () => {
      const r = directive.getPlaceholderComponent();
      expect(r).toBe(placeholderRef);
    });
    it('should listen to the placeholder instance contentChanged', () => {
      spyOn(directive, 'update');
      const showSpy = spyOnProperty(directive, 'showing').and.returnValue(false);
      const r = directive.getPlaceholderComponent();
      placeholderInstance.contentChanged.emit(true);
      expect(directive.update).not.toHaveBeenCalled();
      showSpy.and.returnValue(true);
      placeholderInstance.contentChanged.emit(true);
      expect(directive.update).toHaveBeenCalled();
    });
  });

  describe('getOptions()', () => {
    let ref;
    let insertedContentEl;
    beforeEach(() => {
      insertedContentEl = document.createElement('div');
      ref = {instance: {insertedContent: {nativeElement: insertedContentEl}}};
      spyOn(directive, 'getPlaceholderComponent').and.callFake(() => ref);
    });
    it('should work', () => {
      directive.getOptions();
    });
  });

  describe('create()', () => {
    let bsOptions;
    let lastEvent;
    beforeEach(() => {
      bsOptions = {};
      spyOn(directive, 'getOptions').and.callFake(() => bsOptions);
      directive.myEvents.subscribe(e => lastEvent = e);
    });
    it('should work', () => {
      directive.create();
    });
    it('should listen to events', () => {
      directive.create();
      expect(directive.showing).toBe(false);
      directive.$el.trigger('show');
      expect(directive.showing).toBe(true);
      expect(directive.dismissOnClickOutside).toBe(true);
      expect(directive.clickDismissListener).toBe(null);
      directive.$el.trigger('shown');
      expect(directive.showing).toBe(true);
      expect(directive.clickDismissListener).not.toBe(null);
      directive.$el.trigger('hidden');
      expect(directive.showing).toBe(false);
      expect(directive.clickDismissListener).toBe(null);
    });
    describe('handling clicks', () => {
      let bsInstance;
      let tipEl$;
      let innerTipEl$;
      let outerEl$;
      beforeEach(() => {
        tipEl$ = (window as any).jQuery('<div></div>');
        innerTipEl$ = (window as any).jQuery('<div>In</div>');
        tipEl$.append(innerTipEl$);
        outerEl$ = (window as any).jQuery('<div>Out</div>');
        (window as any).jQuery('body').append(outerEl$);
        (window as any).jQuery('body').append(tipEl$);
        bsInstance = {tip: tipEl$.get(0)};
        spyOnProperty(directive, 'bsInstance').and.returnValue(bsInstance);
        directive.create();
        directive.$el.trigger('show');
        directive.$el.trigger('shown');
      });
      describe('if dismissOnClickOutside is true', () => {
        beforeEach(() => {
          spyOn(directive, 'hide');
          spyOnProperty(directive, 'dismissOnClickOutside').and.returnValue(true);
        });
        it('should call hide if the click is outside', () => {
          console.log(directive.bsInstance.tip);
          outerEl$.trigger('click');
          expect(directive.hide).toHaveBeenCalled();
        });
        it('should not call hide if the click is inside', () => {
          console.log(directive.bsInstance.tip);
          innerTipEl$.trigger('click');
          expect(directive.hide).not.toHaveBeenCalled();
        });

      });
    });
  });
});
