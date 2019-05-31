import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { OobContext } from '../api';

import { NgxFirebaseAuthOobComponent } from './oob.component';

describe('NgxFirebaseAuthOobComponent', () => {
  let component: NgxFirebaseAuthOobComponent;
  let fixture: ComponentFixture<NgxFirebaseAuthOobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFirebaseAuthOobComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
        {provide: ActivatedRoute, useValue: {snapshot: {queryParams: {}}}}
      ]
    })
    .overrideTemplate(NgxFirebaseAuthOobComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFirebaseAuthOobComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have auth', () => {
    expect(component.auth).toBeTruthy();
  });
  it('should have queryParams', () => {
    expect(component.queryParams).toBeTruthy();
  });

  describe('_initRawParams()', () => {
    beforeEach(() => {
      spyOn(component.context, 'emit').and.callThrough();
    });
    it('should set paramOobCode if it exists in queryParams', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({oobCode: 'foo'});
      component._initRawParams();
      expect(component.paramOobCode).toBe('foo');
    });
    it('should set paramOobCode to null if it does not exist in queryParams', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({});
      component._initRawParams();
      expect(component.paramOobCode).toBe(null);
    });
    it('should set paramContext if queryParams.mode is verifyEmail', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({mode: 'verifyEmail'});
      component._initRawParams();
      expect(component.paramContext).toBe(OobContext.verifyEmail);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.verifyEmail);
    });
    it('should set paramContext if queryParams.mode is recoverEmail', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({mode: 'recoverEmail'});
      component._initRawParams();
      expect(component.paramContext).toBe(OobContext.recoverEmail);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.recoverEmail);
    });
    it('should set paramContext if queryParams.mode is signIn', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({mode: 'signIn'});
      component._initRawParams();
      expect(component.paramContext).toBe(OobContext.signIn);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.signIn);
    });
    it('should set paramContext if queryParams.mode is resetPassword', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({mode: 'resetPassword'});
      component._initRawParams();
      expect(component.paramContext).toBe(OobContext.resetPassword);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.resetPassword);
    });
    it('should set paramContext to null if mode is missing in queryParams', () => {
      spyOnProperty(component, 'queryParams').and.returnValue({});
      component._initRawParams();
      expect(component.paramContext).toBe(null);
      expect(component.context.emit).not.toHaveBeenCalled();
    });
  });

  describe('_checkCode()', () => {
    let auth: any;
    let spy: jasmine.Spy;
    beforeEach(() => {
      spyOn(component.context, 'emit').and.callThrough();
      spy = jasmine.createSpy();
      auth = {checkActionCode: spy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
    });
    it('should set an error if paramOobCode is null', fakeAsync(() => {
      component.paramOobCode = null;
      component._checkCode();
      tick();
      expect(component.error).toBeTruthy();
      expect(spy).not.toHaveBeenCalled();
      expect(component.error.code).toBe('navigation');
    }));

    it('should set actionCodeInfo', fakeAsync(() => {
      const info = {operation: 'EMAIL_SIGNIN'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.resolve(info));
      component._checkCode();
      tick();
      expect(spy).toHaveBeenCalledWith('foo');
      expect(component.actionCodeInfo).toBe(info);
    }));
    it('should set and emit the context if operation is EMAIL_SIGNIN', fakeAsync(() => {
      const info = {operation: 'EMAIL_SIGNIN'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.resolve(info));
      component._checkCode();
      tick();
      expect(component.paramContext).toBe(OobContext.signIn);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.signIn);
    }));
    it('should set and emit the context if operation is VERIFY_EMAIL', fakeAsync(() => {
      const info = {operation: 'VERIFY_EMAIL'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.resolve(info));
      component._checkCode();
      tick();
      expect(component.paramContext).toBe(OobContext.verifyEmail);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.verifyEmail);
    }));
    it('should set and emit the context if operation is PASSWORD_RESET', fakeAsync(() => {
      const info = {operation: 'PASSWORD_RESET'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.resolve(info));
      component._checkCode();
      tick();
      expect(component.paramContext).toBe(OobContext.resetPassword);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.resetPassword);
    }));
    it('should set and emit the context if operation is RECOVER_EMAIL', fakeAsync(() => {
      const info = {operation: 'RECOVER_EMAIL'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.resolve(info));
      component._checkCode();
      tick();
      expect(component.paramContext).toBe(OobContext.recoverEmail);
      expect(component.context.emit).toHaveBeenCalledWith(OobContext.recoverEmail);
    }));
    it('should throw if the operation is unknown', fakeAsync(() => {
      const info = {operation: 'FOO'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.resolve(info));
      component._checkCode();
      tick();
      expect(component.error).toBeTruthy();
      expect(component.error.code).toBe('application');
      expect(component.context.emit).not.toHaveBeenCalled();
    }));

    it('should handle a rejection by checkActionCode', fakeAsync(() => {
      const err = {code: 'foo'};
      component.paramOobCode = 'foo';
      spy.and.callFake(() => Promise.reject(err));
      component._checkCode();
      tick();
      expect(component.error).toBeTruthy();
      expect(component.error.code).toBe('foo');
      expect(component.context.emit).not.toHaveBeenCalled();
    }));

  });

  describe('_setInitialScreen()', () => {
    beforeEach(() => {
      spyOn(component.result , 'emit').and.callThrough();
    });
    it('should set the verifyEmail screen', () => {
      component.paramContext = OobContext.verifyEmail;
      component._setInitialScreen();
      expect(component.screen).toBe(component.SCREEN.verifyEmail);
    });
    it('should set the recoverEmail screen', () => {
      component.paramContext = OobContext.recoverEmail;
      component._setInitialScreen();
      expect(component.screen).toBe(component.SCREEN.recoverEmail);
    });
    it('should set the resetPassword screen', () => {
      component.paramContext = OobContext.resetPassword;
      component._setInitialScreen();
      expect(component.screen).toBe(component.SCREEN.resetPassword);
    });
    it('should set the signIn screen', () => {
      component.paramContext = OobContext.signIn;
      component._setInitialScreen();
      expect(component.screen).toBe(component.SCREEN.signIn);
    });
    it('should set the error screen if there is an error', () => {
      component.error = {code: 'foo'} as any;
      component._setInitialScreen();
      expect(component.screen).toBe(component.SCREEN.error);
    });
    it('should emit a result if there is an error and there is no context', () => {
      component.error = {code: 'foo'} as any;
      component._setInitialScreen();
      expect(component.result.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        error: component.error,
        context: 'navigationError'
      }));
    });
    it('should emit a result if there is an error and there is a context', () => {
      component.error = {code: 'foo'} as any;
      component.paramContext = OobContext.signIn;
      component._setInitialScreen();
      expect(component.result.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        error: component.error,
        context: OobContext.signIn
      }));
    });
  });

  describe('ngOnInit()', () => {
    it('should make the right calls', fakeAsync(() => {
      spyOn(component, '_initRawParams').and.callFake(() => {});
      spyOn(component, '_setInitialScreen').and.callFake(() => {});
      spyOn(component, '_checkCode').and.callFake(() => Promise.resolve());
      component.ngOnInit();
      expect(component._initRawParams).toHaveBeenCalled();
      expect(component._checkCode).toHaveBeenCalled();
      tick();
      expect(component._setInitialScreen).toHaveBeenCalled();

    }));
  });

  describe('onSuccess(credential?: auth.UserCredential)', () => {
    let emitSpy: jasmine.Spy;
    beforeEach(() => {
      component.paramContext = OobContext.recoverEmail;
      component.actionCodeInfo = {operation: 'RECOVER_EMAIL', data: {}};
      emitSpy = spyOn(component.result, 'emit');
    });
    it('should emit', () => {
      component.onSuccess();
      expect(emitSpy).toHaveBeenCalledWith({
        context: component.paramContext,
        actionCodeInfo: component.actionCodeInfo
      });
    });
    it('should emit if passed a credential', () => {
      const cred: any = {};
      component.onSuccess(cred);
      expect(emitSpy).toHaveBeenCalledWith({
        context: component.paramContext,
        actionCodeInfo: component.actionCodeInfo,
        credential: cred
      });
    });
  });

  describe('onError(error)', () => {
    let emitSpy: jasmine.Spy;
    let error: any;
    beforeEach(() => {
      error = {};
      component.paramContext = OobContext.recoverEmail;
      component.actionCodeInfo = {operation: 'RECOVER_EMAIL', data: {}};
      emitSpy = spyOn(component.result, 'emit');
    });
    it('should emit', () => {
      component.onError(error);
      expect(emitSpy).toHaveBeenCalledWith({
        context: component.paramContext,
        actionCodeInfo: component.actionCodeInfo,
        error
      });
    });
    it('should set component.error', () => {
      component.onError(error);
      expect(component.error).toBe(error);
    });
    it('should show error', () => {
      component.onError(error);
      expect(component.screen).toBe(component.SCREEN.error);
    });
  });
});
