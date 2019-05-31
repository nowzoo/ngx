import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageHelper } from '../../storage-helper';

import { OobSignInComponent } from './oob-sign-in.component';

describe('OobSignInComponent', () => {
  let component: OobSignInComponent;
  let fixture: ComponentFixture<OobSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OobSignInComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
      ]
    })
    .overrideTemplate(OobSignInComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OobSignInComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have auth', () => {
    expect(component.auth).toBeTruthy();
  });



  describe('ngOnInit()', () => {
    let getSavedEmailSpy: jasmine.Spy;
    beforeEach(() => {
      spyOn(component, 'submit');
      getSavedEmailSpy = spyOn(StorageHelper, 'getSavedSignInLinkEmail').and.callFake(() => 'foo@bar.com');
    });
    it('should set up the form group', () => {
      component.ngOnInit();
      expect(component.emailFc.value).toBe('foo@bar.com');
      expect(component.fg.value).toEqual({email: 'foo@bar.com'});
    });
    it('should call submit if email is valid', fakeAsync(() => {
      component.ngOnInit();
      expect(component.fg.valid).toBe(true);
      expect(component.submit).toHaveBeenCalled();
    }));
    it('should show form email is invalid', fakeAsync(() => {
      getSavedEmailSpy.and.callFake(() => 'foo@');
      component.ngOnInit();
      expect(component.fg.valid).toBe(false);
      expect(component.submit).not.toHaveBeenCalled();
      expect(component.screen).toBe(component.SCREEN.form);
    }));
  });

  describe('submit()', () => {
    let user: any;
    let cred: any;
    let auth: any;
    let signInSpy: jasmine.Spy;
    let successEmitSpy: jasmine.Spy;
    let errorEmitSpy: jasmine.Spy;
    beforeEach(() => {
      user = {};
      cred = {user};
      signInSpy = jasmine.createSpy().and.callFake(() => Promise.resolve(cred));
      auth = {signInWithEmailLink: signInSpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      successEmitSpy = spyOn(component.success$, 'emit').and.callThrough();
      errorEmitSpy = spyOn(component.error$, 'emit').and.callThrough();
      spyOn(StorageHelper, 'getSavedSignInLinkEmail').and.callFake(() => 'foo@bar.com');
      component.ngOnInit();
      component.emailFc.setValue('foo@bar.com');
    });
    it('should resolve', fakeAsync(() => {
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      expect(signInSpy).toHaveBeenCalledWith('foo@bar.com');
      tick();
      expect(component.screen).toBe(component.SCREEN.success);
      expect(successEmitSpy).toHaveBeenCalledWith(cred);
      expect(errorEmitSpy).not.toHaveBeenCalled();
    }));
    it('should handle the auth/invalid-email error', fakeAsync(() => {
      const err = {code: 'auth/invalid-email'};
      signInSpy.and.callFake(() => Promise.reject(err));
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      expect(signInSpy).toHaveBeenCalledWith('foo@bar.com');
      tick();
      expect(component.screen).toBe(component.SCREEN.form);
      expect(component.emailFc.hasError(err.code)).toBe(true);
      component.emailFc.setValue('ff');
      expect(component.emailFc.hasError(err.code)).toBe(false);
      expect(successEmitSpy).not.toHaveBeenCalled();
      expect(errorEmitSpy).not.toHaveBeenCalled();
    }));
    it('should handle the other errors', fakeAsync(() => {
      const err = {code: 'auth/foo'};
      signInSpy.and.callFake(() => Promise.reject(err));
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      expect(signInSpy).toHaveBeenCalledWith('foo@bar.com');
      tick();
      expect(component.screen).toBe(component.SCREEN.error);
      expect(component.error).toBe(err);
      expect(successEmitSpy).not.toHaveBeenCalled();
      expect(errorEmitSpy).toHaveBeenCalledWith(err);


    }));
  });






});
