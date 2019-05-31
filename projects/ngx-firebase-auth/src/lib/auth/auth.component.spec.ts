import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxFirebaseAuthComponent, AuthScreen } from './auth.component';
import {  StorageHelper } from '../storage-helper';

describe('NgxFirebaseAuthComponent', () => {
  let component: NgxFirebaseAuthComponent;
  let fixture: ComponentFixture<NgxFirebaseAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFirebaseAuthComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}}
      ]
    })
    .overrideTemplate(NgxFirebaseAuthComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFirebaseAuthComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have auth', () => {
    expect(component.auth).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call reset()', () => {
      spyOn(component, 'reset');
      component.ngOnInit();
      expect(component.reset).toHaveBeenCalled();
    });
  });

  describe('updateAccount()', () => {
    let fetchSpy: jasmine.Spy;
    let auth: any;
    beforeEach(() => {
      component.emailFc = new FormControl('foo@bar.com');
      component.nameFc = new FormControl('');
      component.passwordFc = new FormControl('');
      component.fg = new FormGroup({email: component.emailFc});
      fetchSpy = jasmine.createSpy().and.callFake(() => Promise.resolve([]));
      auth = {fetchSignInMethodsForEmail: fetchSpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
    });
    it('should set the status', fakeAsync(() => {
      expect(component.accountResult.status).toBe('unfetched');
      component.updateAccount();
      expect(component.accountResult.status).toBe('fetching');
      tick();
      expect(component.accountResult.status).toBe('fetched');
    }));
    it('should make the right api call', () => {
      component.updateAccount();
      expect(fetchSpy).toHaveBeenCalledWith('foo@bar.com');
    });
    it('should not make the api call if the email is invalid', () => {
      component.emailFc.setErrors({a: true});
      component.updateAccount();
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(component.accountResult.status).toBe('unfetched');
    });
    it('should deal with the auth/invalid-email error', fakeAsync(() => {
      const error = {code: 'auth/invalid-email'};
      fetchSpy.and.callFake(() => Promise.reject(error));
      component.updateAccount();
      expect(component.accountResult.status).toBe('fetching');
      tick();
      expect(component.accountResult.status).toBe('unfetched');
      expect(component.emailFc.hasError(error.code)).toBe(true);
      component.emailFc.setValue('a');
      expect(component.emailFc.hasError(error.code)).toBe(false);
    }));
    it('should always remove the name control', () => {
      spyOn(component.fg, 'removeControl');
      component.updateAccount();
      expect(component.fg.removeControl).toHaveBeenCalledWith('name');
    });

    it('should add the name control if account does not exist', fakeAsync(() => {
      fetchSpy.and.callFake(() => Promise.resolve([]));
      component.updateAccount();
      tick();
      expect(component.fg.get('name')).toBe(component.nameFc);
    }));
  });

  describe('reset()', () => {
    let getSavedEmailSpy: jasmine.Spy;
    let updateAccountSpy: jasmine.Spy;
    beforeEach(() => {
      getSavedEmailSpy = spyOn(StorageHelper, 'getSavedEmail').and.callFake(() => '');
      updateAccountSpy = spyOn(component, 'updateAccount');
    });
    it('should set up the email control', () => {
      component.reset();
      expect(getSavedEmailSpy).toHaveBeenCalled();
      expect(component.emailFc).toBeTruthy();
      expect(component.emailFc.value).toBe('');
      expect(component.fg.get('email')).toBe(component.emailFc);
    });
    it('should set the value of the email control based on what has been saved', () => {
      getSavedEmailSpy.and.callFake(() => 'foo@bar.com');
      component.reset();
      expect(component.emailFc.value).toBe('foo@bar.com');
    });
    it('should set up the password control', () => {
      component.reset();
      expect(component.passwordFc).toBeTruthy();
      expect(component.passwordFc.value).toBe('');
      expect(component.fg.get('password')).toBe(component.passwordFc);
    });
    it('should set up the name control', () => {
      component.reset();
      expect(component.nameFc).toBeTruthy();
      expect(component.nameFc.value).toBe('');
      // we add the name later...
      expect(component.fg.get('name')).toBe(null);
    });
    it('should call updateAccount once to begin with', () => {
      component.reset();
      expect(updateAccountSpy).toHaveBeenCalledTimes(1);
    });
    it('should call updateAccount whenever the email changes, debounced by NgxFirebaseAuthComponent.debounceMs', fakeAsync(() => {
      component.reset();
      expect(updateAccountSpy).toHaveBeenCalledTimes(1);
      component.emailFc.setValue('foo');
      expect(updateAccountSpy).toHaveBeenCalledTimes(1);
      tick(NgxFirebaseAuthComponent.debounceMs - 1);
      expect(updateAccountSpy).toHaveBeenCalledTimes(1);
      tick(1);
      expect(updateAccountSpy).toHaveBeenCalledTimes(2);
    }));
  });

  describe('submit()', () => {
    let cred: any;
    let resultEmitSpy: jasmine.Spy;
    beforeEach(() => {
      cred = {};
      resultEmitSpy = spyOn(component.result, 'emit');
    });
    describe('existing account', () => {
      let signInSpy: jasmine.Spy;
      let auth: any;
      beforeEach(() => {
        signInSpy = jasmine.createSpy().and.callFake(() => Promise.resolve(cred));
        auth = {signInWithEmailAndPassword: signInSpy};
        spyOnProperty(component, 'auth').and.returnValue(auth);
        component.accountResult = {email: 'foo@bar.com', exists: true} as any;
        component.passwordFc = new FormControl('p');
      });
      it('should resolve if there is not an error', fakeAsync(() => {
        component.screen = AuthScreen.form;
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        component.submit();
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(true);
        expect(signInSpy).toHaveBeenCalledWith('foo@bar.com', 'p');
        tick();
        expect(component.credential).toBe(cred);
        expect(component.screen).toBe(AuthScreen.signInSuccess);
        expect(component.submitting).toBe(false);
        expect(resultEmitSpy).toHaveBeenCalledWith(cred);
      }));
      it('should handle the auth/wrong-password error', fakeAsync(() => {
        component.screen = AuthScreen.form;
        const error = {code: 'auth/wrong-password'};
        signInSpy.and.callFake(() => Promise.reject(error));
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        component.submit();
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(true);
        expect(signInSpy).toHaveBeenCalledWith('foo@bar.com', 'p');
        tick();
        expect(component.credential).toBe(null);
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        expect(component.error).toBe(null);
        expect(component.passwordFc.hasError(error.code)).toBe(true);
        component.passwordFc.setValue('ggg');
        expect(component.passwordFc.hasError(error.code)).toBe(false);
        expect(resultEmitSpy).not.toHaveBeenCalled();
      }));
      it('should handle the auth/foo error by showing the error', fakeAsync(() => {
        component.screen = AuthScreen.form;
        const error = {code: 'auth/foo'};
        signInSpy.and.callFake(() => Promise.reject(error));
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        component.submit();
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(true);
        expect(signInSpy).toHaveBeenCalledWith('foo@bar.com', 'p');
        tick();
        expect(component.credential).toBe(null);
        expect(component.screen).toBe(AuthScreen.error);
        expect(component.submitting).toBe(false);
        expect(component.error).toBe(error);
        expect(resultEmitSpy).not.toHaveBeenCalled();
      }));

    });
    describe('new account', () => {
      let createSpy: jasmine.Spy;
      let updateProfileSpy: jasmine.Spy;
      let reloadSpy: jasmine.Spy;
      let auth: any;
      beforeEach(() => {
        updateProfileSpy  = jasmine.createSpy().and.callFake(() => Promise.resolve());
        reloadSpy  = jasmine.createSpy().and.callFake(() => Promise.resolve());
        cred.user = {updateProfile: updateProfileSpy, reload: reloadSpy};
        createSpy = jasmine.createSpy().and.callFake(() => Promise.resolve(cred));
        auth = {createUserWithEmailAndPassword: createSpy};
        spyOnProperty(component, 'auth').and.returnValue(auth);
        component.accountResult = {email: 'foo@bar.com', exists: false} as any;
        component.nameFc = new FormControl('name');
        component.passwordFc = new FormControl('p');
      });
      it('should resolve if there is not an error', fakeAsync(() => {
        component.screen = AuthScreen.form;
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        component.submit();
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(true);
        expect(createSpy).toHaveBeenCalledWith('foo@bar.com', 'p');
        tick();
        expect(updateProfileSpy).toHaveBeenCalledWith({displayName: 'name'});
        expect(reloadSpy).toHaveBeenCalledWith();
        expect(component.credential).toBe(cred);
        expect(component.screen).toBe(AuthScreen.signInSuccess);
        expect(component.submitting).toBe(false);
        expect(resultEmitSpy).toHaveBeenCalledWith(cred);
      }));
      it('should handle the auth/weak-password error', fakeAsync(() => {
        component.screen = AuthScreen.form;
        const error = {code: 'auth/weak-password'};
        createSpy.and.callFake(() => Promise.reject(error));
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        component.submit();
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(true);
        expect(createSpy).toHaveBeenCalledWith('foo@bar.com', 'p');
        tick();
        expect(updateProfileSpy).not.toHaveBeenCalled();
        expect(reloadSpy).not.toHaveBeenCalled();
        expect(component.credential).toBe(null);
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        expect(component.error).toBe(null);
        expect(component.passwordFc.hasError(error.code)).toBe(true);
        component.passwordFc.setValue('ggg');
        expect(component.passwordFc.hasError(error.code)).toBe(false);
        expect(resultEmitSpy).not.toHaveBeenCalled();
      }));
      it('should handle the auth/foo error by showing the error', fakeAsync(() => {
        component.screen = AuthScreen.form;
        const error = {code: 'auth/foo'};
        createSpy.and.callFake(() => Promise.reject(error));
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(false);
        component.submit();
        expect(component.screen).toBe(AuthScreen.form);
        expect(component.submitting).toBe(true);
        expect(createSpy).toHaveBeenCalledWith('foo@bar.com', 'p');
        tick();
        expect(updateProfileSpy).not.toHaveBeenCalled();
        expect(reloadSpy).not.toHaveBeenCalled();
        expect(component.credential).toBe(null);
        expect(component.screen).toBe(AuthScreen.error);
        expect(component.submitting).toBe(false);
        expect(component.error).toBe(error);
        expect(resultEmitSpy).not.toHaveBeenCalled();
      }));
    });
  });

  describe('sendResetPasswordLink()', () => {
    let sendSpy: jasmine.Spy;
    let auth: any;
    beforeEach(() => {
      sendSpy = jasmine.createSpy().and.callFake(() => Promise.resolve());
      auth = {sendPasswordResetEmail: sendSpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      component.accountResult = {email: 'foo@bar.com'} as any;
    });
    it('should resolve if there is not an error', fakeAsync(() => {
      component.screen = AuthScreen.form;
      expect(component.screen).toBe(AuthScreen.form);
      expect(component.submitting).toBe(false);
      component.sendResetPasswordLink();
      expect(component.screen).toBe(AuthScreen.wait);
      expect(component.submitting).toBe(true);
      expect(sendSpy).toHaveBeenCalledWith('foo@bar.com');
      tick();
      expect(component.screen).toBe(AuthScreen.resetPasswordLinkSuccess);
      expect(component.submitting).toBe(false);
    }));
    it('should handle all errors by showing the error', fakeAsync(() => {
      const error = {code: 'auth/foo'};
      sendSpy.and.callFake(() => Promise.reject(error));
      component.screen = AuthScreen.form;
      expect(component.screen).toBe(AuthScreen.form);
      expect(component.submitting).toBe(false);
      component.sendResetPasswordLink();
      expect(component.screen).toBe(AuthScreen.wait);
      expect(component.submitting).toBe(true);
      expect(sendSpy).toHaveBeenCalledWith('foo@bar.com');
      tick();
      expect(component.screen).toBe(AuthScreen.error);
      expect(component.error).toBe(error);
      expect(component.submitting).toBe(false);
    }));
  });

  describe('sendSignInLink()', () => {
    let sendSpy: jasmine.Spy;
    let auth: any;
    beforeEach(() => {
      spyOn(StorageHelper, 'saveSignInLinkEmail').and.callThrough();
      sendSpy = jasmine.createSpy().and.callFake(() => Promise.resolve());
      auth = {sendSignInLinkToEmail: sendSpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      component.accountResult = {email: 'foo@bar.com'} as any;
    });
    it('should resolve if there is not an error', fakeAsync(() => {
      component.screen = AuthScreen.form;
      expect(component.screen).toBe(AuthScreen.form);
      expect(component.submitting).toBe(false);
      component.sendSignInLink();
      expect(component.screen).toBe(AuthScreen.wait);
      expect(component.submitting).toBe(true);
      expect(sendSpy).toHaveBeenCalledWith('foo@bar.com', jasmine.any(Object));
      tick();
      expect(component.screen).toBe(AuthScreen.signInLinkSuccess);
      expect(component.submitting).toBe(false);
      expect(StorageHelper.saveSignInLinkEmail).toHaveBeenCalledWith('foo@bar.com');
    }));
    it('should handle all errors by showing the error', fakeAsync(() => {
      const error = {code: 'auth/foo'};
      sendSpy.and.callFake(() => Promise.reject(error));
      component.screen = AuthScreen.form;
      expect(component.screen).toBe(AuthScreen.form);
      expect(component.submitting).toBe(false);
      component.sendSignInLink();
      expect(component.screen).toBe(AuthScreen.wait);
      expect(component.submitting).toBe(true);
      expect(sendSpy).toHaveBeenCalledWith('foo@bar.com', jasmine.any(Object));
      tick();
      expect(component.screen).toBe(AuthScreen.error);
      expect(component.error).toBe(error);
      expect(component.submitting).toBe(false);
      expect(StorageHelper.saveSignInLinkEmail).not.toHaveBeenCalled();

    }));
  });









});
