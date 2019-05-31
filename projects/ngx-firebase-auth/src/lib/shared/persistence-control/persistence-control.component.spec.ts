import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageHelper } from '../../storage-helper';
import * as firebase from 'firebase';
import { PersistenceControlComponent } from './persistence-control.component';

describe('PersistenceControlComponent', () => {
  let component: PersistenceControlComponent;
  let fixture: ComponentFixture<PersistenceControlComponent>;
  const Persistence = firebase.auth.Auth.Persistence;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersistenceControlComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: {auth: {}}},
      ]
    })
    .overrideTemplate(PersistenceControlComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistenceControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have auth', () => {
    expect(component.auth).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    let valSpy: jasmine.Spy;
    let updateSpy: jasmine.Spy;
    beforeEach(() => {
      valSpy = spyOn(StorageHelper, 'getSavedPersistence').and.callFake(() => false);
      updateSpy = spyOn(component, 'update');
    });
    it('should call StorageHelper.getSavedPersistence', () => {
      component.ngOnInit();
      expect(valSpy).toHaveBeenCalled();
    });
    it('should create a control', () => {
      expect(component.fc).not.toBeTruthy();
      component.ngOnInit();
      expect(component.fc).toBeTruthy();
    });
    it('should set the control to true if that is what is returned', () => {
      valSpy.and.callFake(() => true);
      component.ngOnInit();
      expect(component.fc.value).toBe(true);
    });
    it('should set the control to false if that is what is returned', () => {
      valSpy.and.callFake(() => false);
      component.ngOnInit();
      expect(component.fc.value).toBe(false);
    });
    it('should watch the control, and call update', () => {
      component.ngOnInit();
      expect(component.fc.value).toBe(false);
      component.fc.setValue(true);
      expect(updateSpy).toHaveBeenCalledWith();
    });
  });

  describe('update()', () => {
    let setSpy: jasmine.Spy;
    let auth: any;
    let storeSpy: jasmine.Spy;
    beforeEach(() => {
      setSpy = jasmine.createSpy().and.callFake(() => Promise.resolve());
      auth = {setPersistence: setSpy};
      spyOnProperty(component, 'auth').and.returnValue(auth);
      storeSpy = spyOn(StorageHelper, 'savePersistence').and.callFake(() => {});
      component.ngOnInit();
    });
    it('should make the right calls if fc is true', fakeAsync(() => {
      component.fc.setValue(true);
      expect(setSpy).toHaveBeenCalledWith(Persistence.LOCAL);
      expect(storeSpy).not.toHaveBeenCalled();
      tick();
      expect(storeSpy).toHaveBeenCalledWith(true);
    }));
    it('should make the right calls if fc is false', fakeAsync(() => {
      component.fc.setValue(false);
      expect(setSpy).toHaveBeenCalledWith(Persistence.SESSION);
      expect(storeSpy).not.toHaveBeenCalled();
      tick();
      expect(storeSpy).toHaveBeenCalledWith(false);
    }));
  });
});
