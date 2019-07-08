import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';
import { NgxBootstrapModalService } from './ngx-bootstrap-modal.service';

describe('NgxBootstrapModalService', () => {
  let service: NgxBootstrapModalService;

  beforeEach(() => {

    (window as any).jQuery = jQuery;
    (window as any).bootstrap = bootstrap;
    TestBed.configureTestingModule({
    });
    service = TestBed.get(NgxBootstrapModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getters', () => {
    it('should have appRef', () => {
      expect(service.appRef).toBeTruthy();
    });
    it('should have ngZone', () => {
      expect(service.zone).toBeTruthy();
    });
  });

  describe('show() and hide()', () => {
    let viewRef: any;
    let templateRef: any;
    let appRef: any;
    let el: HTMLElement;

    beforeEach(() => {
      el = document.createElement('div');
      appRef = {
        attachView: jasmine.createSpy(),
        detachView: jasmine.createSpy()
      };
      spyOnProperty(service, 'appRef').and.returnValue(appRef);
      viewRef = {
        rootNodes: [el],
        destroy: jasmine.createSpy()
      };
      templateRef = {
        createEmbeddedView: jasmine.createSpy().and.returnValue(viewRef)
      };
    });
    it('should work', () => {
      const instance = service.show(templateRef);
      expect(instance.events).toBeTruthy();
      expect(instance.hidden).toBeTruthy();
      expect(instance.shown).toBeTruthy();
      expect(instance.hide).toBeTruthy();
      expect(instance.handleUpdate).toBeTruthy();
      expect(instance.modalEl).toBeTruthy();
    });
    it('should resolve shown', fakeAsync(() => {
      let resolved = false;
      const instance = service.show(templateRef);
      instance.shown.then(() => resolved = true);
      expect(resolved).toBe(false);
      tick();
      expect(resolved).toBe(true);
    }));
    it('should resolve hidden', fakeAsync(() => {
      let resolved = false;
      const instance = service.show(templateRef);
      instance.hidden.then(() => resolved = true);
      expect(resolved).toBe(false);
      tick();
      instance.hide();
      expect(resolved).toBe(false);
      tick();
      expect(resolved).toBe(true);
    }));

    it('should have handleUpdate', fakeAsync(() => {
      const instance = service.show(templateRef);
      spyOn(instance, 'handleUpdate').and.callThrough();
      instance.shown.then(() => instance.handleUpdate());
      tick();
      expect(instance.handleUpdate).toHaveBeenCalled();
    }));



    //
    // it('should handle events', () => {
    //   const instance = service.show(templateRef);
    //   let anEvent;
    //   const srcEvent = new Event('shown');
    //   instance.events.subscribe(e => anEvent = e);
    //   el.dispatchEvent(srcEvent);
    //   console.log(anEvent);
    // });
  });
});
