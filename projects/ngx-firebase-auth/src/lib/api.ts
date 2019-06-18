import { auth } from 'firebase/app';

export enum OobContext {
  signIn = 'signIn',
  verifyEmail = 'verifyEmail',
  resetPassword = 'resetPassword',
  recoverEmail = 'recoverEmail'
}
export interface IOobResult {
  context: OobContext | 'navigationError';
  actionCodeInfo?: auth.ActionCodeInfo;
  credential?: auth.UserCredential;
  error?: auth.Error;
}



export interface IAccountResult {
  status: 'unfetched' | 'fetching' | 'fetched';
  exists?: boolean;
  hasPassword?: boolean;
  methods?: string[];
  email?: string;
}



export const SK_SIGN_IN_LINK_SAVED_EMAIL = 'ngx-firebase-auth-sign-in-link-saved-email';
export const SK_SAVED_EMAIL = 'ngx-firebase-auth-saved-email';
export const SK_SAVED_PERSISTENCE = 'ngx-firebase-auth-saved-persistence';
