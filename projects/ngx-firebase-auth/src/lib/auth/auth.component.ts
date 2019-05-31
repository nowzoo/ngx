import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { auth } from 'firebase/app';
import { debounceTime } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { IAccountResult } from '../api';
import { FormHelper } from '../form-helper';
import { StorageHelper } from '../storage-helper';

export enum AuthScreen {
  wait,
  form,
  signInSuccess,
  resetPasswordLinkSuccess,
  signInLinkSuccess,
  error
}

@Component({
  selector: 'ngx-firebase-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class NgxFirebaseAuthComponent implements OnInit {

  static debounceMs = 500;

  @Output() result: EventEmitter<auth.UserCredential> = new EventEmitter();
  emailFc: FormControl;
  passwordFc: FormControl;
  nameFc: FormControl;
  fg: FormGroup;
  id = 'ngx-firebase-auth-sign-in';
  submitting = false;
  error: auth.Error = null;
  credential: auth.UserCredential = null;
  accountResult: IAccountResult = {status: 'unfetched'};
  SCREEN = AuthScreen;
  screen: AuthScreen = AuthScreen.wait;


  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  ngOnInit() {
    this.reset();
  }

  async reset() {
    this.screen = AuthScreen.wait;
    this.emailFc = new FormControl(StorageHelper.getSavedEmail(), [FormHelper.email]);
    this.passwordFc = new FormControl('', [Validators.required]);
    this.nameFc = new FormControl('', [FormHelper.nonEmptyValidator]);
    this.fg = new FormGroup({
      email: this.emailFc,
      password: this.passwordFc
    });
    this.emailFc.valueChanges
      .pipe(debounceTime(NgxFirebaseAuthComponent.debounceMs))
      .subscribe(() => this.updateAccount());
    await this.updateAccount();
    this.screen = AuthScreen.form;
  }

  async updateAccount() {
    this.accountResult = {status: 'fetching'};
    this.fg.removeControl('name');
    if (this.emailFc.invalid) {
      this.accountResult = {status: 'unfetched'};
      return;
    }
    const email = this.emailFc.value.trim();
    try {
      const methods = await this.auth.fetchSignInMethodsForEmail(email);
      if (methods.length === 0) {
        this.fg.setControl('name', this.nameFc);
      }
      this.accountResult = {
        methods,
        exists: methods.length > 0,
        hasPassword: methods.indexOf('password') > -1,
        email,
        status: 'fetched'
      };

    } catch (e) {
      FormHelper.setTransientError(this.emailFc, e.code);
      this.accountResult = {status: 'unfetched'};
    }
  }

  async submit() {
    this.submitting = true;
    const email = this.accountResult.email;
    const password = this.passwordFc.value;
    try {
      if (this.accountResult.exists) {
        this.credential = await this.auth.signInWithEmailAndPassword(email, password);
      } else {
        const name = this.nameFc.value.trim();
        this.credential = await this.auth.createUserWithEmailAndPassword(email, password);
        await this.credential.user.updateProfile({displayName: name});
        await this.credential.user.reload();
      }
      const remember = StorageHelper.getSavedPersistence();
      if (remember) {
        StorageHelper.saveEmail(email);
      }
      this.result.emit(this.credential);
      this.submitting = false;
      this.screen = AuthScreen.signInSuccess;
    } catch (e) {
      this.submitting = false;
      switch (e.code) {
        case 'auth/wrong-password':
        case 'auth/weak-password':
          FormHelper.setTransientError(this.passwordFc, e.code);
          break;
        default:
          this.error = e;
          this.screen = AuthScreen.error;
          break;
      }
    }
  }

  async sendSignInLink() {
    this.submitting = true;
    this.screen = AuthScreen.wait;
    const email = this.accountResult.email;
    try {
      await this.auth.sendSignInLinkToEmail(email, {handleCodeInApp: true, url: window.location.href});
      StorageHelper.saveSignInLinkEmail(email);
      this.submitting = false;
      this.screen = AuthScreen.signInLinkSuccess;
    } catch (e) {
      this.submitting = false;
      this.error = e;
      this.screen = AuthScreen.error;
    }
  }

  async sendResetPasswordLink() {
    this.submitting = true;
    this.screen = AuthScreen.wait;
    const email = this.accountResult.email;
    try {
      await this.auth.sendPasswordResetEmail(email);
      this.submitting = false;
      this.screen = AuthScreen.resetPasswordLinkSuccess;
    } catch (e) {
      this.submitting = false;
      this.error = e;
      this.screen = AuthScreen.error;
    }
  }


}
