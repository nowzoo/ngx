import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';


import { OobResetPasswordComponent } from './oob-reset-password.component';

describe('OobResetPasswordComponent', () => {
  let component: OobResetPasswordComponent;
  let fixture: ComponentFixture<OobResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OobResetPasswordComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
      ]
    })
    .overrideTemplate(OobResetPasswordComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OobResetPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have auth', () => {
    expect(component.auth).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      component.actionCodeInfo = {data: {email: 'foo@bar.com'}} as any;
      component.oobCode = 'foo';
    });
    it('should create a form group', () => {
      component.ngOnInit();
      expect(component.fg).toBeTruthy();
      expect(component.emailFc).toBeTruthy();
      expect(component.emailFc).toBe(component.fg.get('email'));
      expect(component.passwordFc).toBeTruthy();
      expect(component.passwordFc).toBe(component.fg.get('password'));
    });
  });

  describe('submit()', () => {
    let confirmSpy: jasmine.Spy;
    let signInSpy: jasmine.Spy;
    let auth: any;
    let cred: any;
    let successEmitSpy: jasmine.Spy;
    let errorEmitSpy: jasmine.Spy;
    beforeEach(() => {
      cred = {};
      component.actionCodeInfo = {data: {email: 'foo@bar.com'}} as any;
      component.oobCode = 'foo';
      confirmSpy = jasmine.createSpy().and.callFake(() => Promise.resolve());
      signInSpy = jasmine.createSpy().and.callFake(() => Promise.resolve(cred));
      auth = {confirmPasswordReset: confirmSpy, signInWithEmailAndPassword: signInSpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      successEmitSpy = spyOn(component.success$, 'emit').and.callThrough();
      errorEmitSpy = spyOn(component.error$, 'emit').and.callThrough();
      component.ngOnInit();
      component.passwordFc.setValue('pass');
    });

    it('should make the right api calls', fakeAsync(() => {
      component.submit();
      expect(confirmSpy).toHaveBeenCalledWith(component.oobCode, 'pass');
      tick();
      expect(signInSpy).toHaveBeenCalledWith('foo@bar.com', 'pass');
    }));

    it('should set screen correctly', fakeAsync(() => {
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      tick();
      expect(component.screen).toBe(component.SCREEN.success);
    }));
    it('should emit success$', fakeAsync(() => {
      component.submit();
      tick();
      expect(successEmitSpy).toHaveBeenCalledWith(cred);
      expect(errorEmitSpy).not.toHaveBeenCalled();
    }));

    it('should handle auth/weak-password err', fakeAsync(() => {
      const err = {code: 'auth/weak-password'};
      confirmSpy.and.callFake(() => Promise.reject(err));
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      tick();
      expect(component.screen).toBe(component.SCREEN.form);
      expect(component.passwordFc.hasError(err.code)).toBe(true);
      component.passwordFc.setValue('');
      expect(component.passwordFc.hasError(err.code)).toBe(false);
      expect(errorEmitSpy).not.toHaveBeenCalled();
      expect(successEmitSpy).not.toHaveBeenCalled();
    }));
    it('should handle all other errors', fakeAsync(() => {
      const err = {code: 'auth/foo'};
      confirmSpy.and.callFake(() => Promise.reject(err));
      component.submit();
      expect(component.screen).toBe(component.SCREEN.wait);
      tick();
      expect(component.screen).toBe(component.SCREEN.error);
      expect(errorEmitSpy).toHaveBeenCalledWith(err);
      expect(successEmitSpy).not.toHaveBeenCalled();
    }));



  });


});
