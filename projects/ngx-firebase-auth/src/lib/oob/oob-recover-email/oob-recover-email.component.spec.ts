import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { OobRecoverEmailComponent } from './oob-recover-email.component';

describe('OobRecoverEmailComponent', () => {
  let component: OobRecoverEmailComponent;
  let fixture: ComponentFixture<OobRecoverEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OobRecoverEmailComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}}
      ]
    })
    .overrideTemplate(OobRecoverEmailComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OobRecoverEmailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have auth', () => {
    expect(component.auth).toBeTruthy();
  });
  describe('submit()', () => {
    let applySpy: jasmine.Spy;
    let auth: any;
    let successEmitSpy: jasmine.Spy;
    let errorEmitSpy: jasmine.Spy;
    beforeEach(() => {
      component.oobCode = 'foo';
      applySpy = jasmine.createSpy().and.callFake(() => Promise.resolve());
      auth = {applyActionCode: applySpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      successEmitSpy = spyOn(component.success$, 'emit').and.callThrough();
      errorEmitSpy = spyOn(component.error$, 'emit').and.callThrough();
    });
    it('should call auth.applyActionCode', () => {
      component.submit();
      expect(applySpy).toHaveBeenCalledWith(component.oobCode);
    });
    it('should set screen to success if resolved', fakeAsync(() => {
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      tick();
      expect(component.screen).toBe(component.SCREEN.success);
    }));
    it('should emit success$ if resolved', fakeAsync(() => {
      component.submit();
      tick();
      expect(successEmitSpy).toHaveBeenCalledWith();
      expect(errorEmitSpy).not.toHaveBeenCalled();
    }));
    describe('error', () => {
      let err: any;
      beforeEach(() => {
        err = {};
        applySpy.and.callFake(() => Promise.reject(err));
      });
      it('should set screen to error', fakeAsync(() => {
        component.submit();
        expect(component.screen).toBe(component.SCREEN.wait);
        tick();
        expect(component.screen).toBe(component.SCREEN.error);
      }));
      it('should emit error$', fakeAsync(() => {
        component.submit();
        tick();
        expect(successEmitSpy).not.toHaveBeenCalled();
        expect(errorEmitSpy).toHaveBeenCalledWith(err);
      }));
    });
  });
});
