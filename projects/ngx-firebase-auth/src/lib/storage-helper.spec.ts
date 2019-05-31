import * as firebase from 'firebase';
import {
  SK_SIGN_IN_LINK_SAVED_EMAIL,
  SK_SAVED_EMAIL,
  SK_SAVED_PERSISTENCE
} from './api';

import { StorageHelper } from './storage-helper';

describe('StorageHelper', () => {
  const Persistence = firebase.auth.Auth.Persistence;
  describe('savePersistence(local: boolean)', () => {
    let setItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;

    beforeEach(() => {
      setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});
      removeItemSpy = spyOn(localStorage, 'removeItem');
    });
    it('should handle true, i.e., Persistence.LOCAL', () => {
      StorageHelper.savePersistence(true);
      expect(setItemSpy).toHaveBeenCalledWith(SK_SAVED_PERSISTENCE, Persistence.LOCAL);
      expect(removeItemSpy).not.toHaveBeenCalled();
    });
    it('should handle false, i.e., Persistence.SESSION, clearing the save email as well as setting the persistence', () => {
      StorageHelper.savePersistence(false);
      expect(setItemSpy).toHaveBeenCalledWith(SK_SAVED_PERSISTENCE, Persistence.SESSION);
      expect(removeItemSpy).toHaveBeenCalledWith(SK_SAVED_EMAIL);
    });
  });

  describe('getSavedPersistence()', () => {
    let getItemSpy: jasmine.Spy;
    beforeEach(() => {
      getItemSpy = spyOn(localStorage, 'getItem').and.callFake(() => null);
    });
    it('should be true, i.e. Persistence.LOCAL,  if null is the stored value', () => {
      expect(StorageHelper.getSavedPersistence()).toBe(true);
    });
    it('should be true, i.e. Persistence.LOCAL,  if Persistence.LOCAL is the stored value', () => {
      getItemSpy.and.callFake(() => Persistence.LOCAL);
      expect(StorageHelper.getSavedPersistence()).toBe(true);
    });
    it('should be false, i.e. Persistence.SESSION,  if Persistence.SESSION is the stored value', () => {
      getItemSpy.and.callFake(() => Persistence.SESSION);
      expect(StorageHelper.getSavedPersistence()).toBe(false);
    });
  });

  describe('saveEmail(email)', () => {
    it('should save the email', () => {
      const setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});
      StorageHelper.saveEmail('foo@bar.com');
      expect(setItemSpy).toHaveBeenCalledWith(SK_SAVED_EMAIL, 'foo@bar.com');
    });
  });

  describe('getSavedEmail()', () => {
    let getItemSpy: jasmine.Spy;
    beforeEach(() => {
      getItemSpy = spyOn(localStorage, 'getItem').and.callFake(() => null);
    });
    it('should be "" if nothing is stored', () => {
      expect(StorageHelper.getSavedEmail()).toBe('');
    });
    it('should be the value if something is stored', () => {
      getItemSpy.and.callFake(() => 'foo');
      expect(StorageHelper.getSavedEmail()).toBe('foo');
    });
    it('should trim the value', () => {
      getItemSpy.and.callFake(() => '    foo    ');
      expect(StorageHelper.getSavedEmail()).toBe('foo');
    });
  });

  describe('saveSignInLinkEmail(email: string)', () => {
    it('should save the email', () => {
      const setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});
      StorageHelper.saveSignInLinkEmail('foo@bar.com');
      expect(setItemSpy).toHaveBeenCalledWith(SK_SIGN_IN_LINK_SAVED_EMAIL, 'foo@bar.com');
    });
  });

  describe('getSavedSignInLinkEmail()', () => {
    let getItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;
    beforeEach(() => {
      getItemSpy = spyOn(localStorage, 'getItem').and.callFake(() => null);
      removeItemSpy = spyOn(localStorage, 'removeItem').and.callFake(() => {});
    });
    it('should be "" if nothing is stored', () => {
      expect(StorageHelper.getSavedSignInLinkEmail()).toBe('');
    });
    it('should remove the item', () => {
      expect(StorageHelper.getSavedSignInLinkEmail()).toBe('');
      expect(removeItemSpy).toHaveBeenCalled();
    });
    it('should be the value if something is stored', () => {
      getItemSpy.and.callFake(() => 'foo');
      expect(StorageHelper.getSavedSignInLinkEmail()).toBe('foo');
    });
    it('should trim the value', () => {
      getItemSpy.and.callFake(() => '    foo    ');
      expect(StorageHelper.getSavedSignInLinkEmail()).toBe('foo');
    });
  });
});
