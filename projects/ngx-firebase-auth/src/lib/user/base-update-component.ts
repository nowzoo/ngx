import { BaseComponent } from './base-component';
import { auth, User } from 'firebase/app';
import { Output, EventEmitter, OnInit } from '@angular/core';
import { FormHelper } from '../form-helper';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

export enum UpdateScreen {
  form = 'form',
  reauth = 'reauth',
  error = 'error',
  wait = 'wait',
  success = 'success',
  resetPasswordLinkSuccess = 'resetPasswordLinkSuccess'
}

export abstract class BaseUpdateComponent extends BaseComponent implements OnInit {
  SCREEN = UpdateScreen;
  screen: UpdateScreen = UpdateScreen.wait;
  error: auth.Error = null;
  fg: FormGroup;
  emailFc: FormControl;
  passwordFc: FormControl;
  @Output() success: EventEmitter<User> = new EventEmitter();

  abstract handleSubmit(): Promise<void>;
  abstract createFg(): FormGroup;

  ngOnInit() {
    super.ngOnInit();
    this.emailFc = new FormControl('', [(fc) => this.validateEmail(fc)]);
    this.passwordFc = new FormControl('', [Validators.required]);
    this.fg = this.createFg();
    this.screen = UpdateScreen.form;
  }

  validateEmail(fc: AbstractControl) {
    const val: string = 'string' === typeof fc.value ? fc.value.trim() : '';
    if (val.length === 0) {
      return {required: true};
    }
    if (val.toLowerCase() === this.user.email.toLowerCase()) {
      return {unchanged: true};
    }
    return Validators.email(fc);
  }


  async submit() {
    this.error = null;
    this.screen = UpdateScreen.wait;
    try {
      await this.handleSubmit();
      await this.user.reload();
      this.success.emit(this.user);
      this.screen = UpdateScreen.success;
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/email-already-in-use':
          FormHelper.setTransientError(this.emailFc, error.code);
          this.screen = UpdateScreen.form;
          break;
        case 'auth/weak-password':
          FormHelper.setTransientError(this.passwordFc, error.code);
          this.screen = UpdateScreen.form;
          break;
        case 'auth/requires-recent-login':
          this.screen = UpdateScreen.reauth;
          break;
        default:
          this.error = error;
          this.screen = UpdateScreen.error;
          break;
      }
    }
  }

  onReauth(cred: auth.UserCredential) {
    this.user = cred.user;
    this.submit();
  }
  onReauthError(error: auth.Error) {
    this.error = error;
    this.screen = UpdateScreen.error;
  }

  async sendResetPasswordLink() {
    this.screen = UpdateScreen.wait;
    try {
      await this.auth.sendPasswordResetEmail(this.user.email);
      this.screen = UpdateScreen.resetPasswordLinkSuccess;
    } catch (e) {
      this.error = e;
      this.screen = UpdateScreen.error;
    }
  }

  reset() {
    this.error = null;
    this.screen = UpdateScreen.form;
  }
}
