import {
  SK_SIGN_IN_LINK_SAVED_EMAIL,
  SK_SAVED_EMAIL,
  SK_SAVED_PERSISTENCE
} from './api';
import { auth } from 'firebase/app';

export class StorageHelper {

  static savePersistence(local: boolean) {
    const value: string = local ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.SESSION;
    localStorage.setItem(SK_SAVED_PERSISTENCE, value);
    if (value === auth.Auth.Persistence.SESSION) {
      localStorage.removeItem(SK_SAVED_EMAIL);
    }
  }
  static getSavedPersistence(): boolean {
    const value: string = localStorage.getItem(SK_SAVED_PERSISTENCE);
    return value !== auth.Auth.Persistence.SESSION;
  }

  static saveEmail(email: string) {
    localStorage.setItem(SK_SAVED_EMAIL, email);
  }

  static getSavedEmail(): string {
    const value: string = localStorage.getItem(SK_SAVED_EMAIL);
    return 'string' === typeof value ? value.trim() : '';
  }



  static saveSignInLinkEmail(email: string) {
    localStorage.setItem(SK_SIGN_IN_LINK_SAVED_EMAIL, email);
  }
  static getSavedSignInLinkEmail(): string {
    const value: string = localStorage.getItem(SK_SIGN_IN_LINK_SAVED_EMAIL);
    localStorage.removeItem(SK_SIGN_IN_LINK_SAVED_EMAIL);
    return 'string' === typeof value ? value.trim() : '';
  }


}
