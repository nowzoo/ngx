import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormControl, FormGroup } from '@angular/forms';
import { FormHelper } from '../../form-helper';
import { StorageHelper } from '../../storage-helper';

enum Screen {
  wait,
  form,
  success,
  error
}

@Component({
  selector: 'ngx-firebase-auth-oob-sign-in',
  templateUrl: './oob-sign-in.component.html',
  styleUrls: ['./oob-sign-in.component.scss']
})
export class OobSignInComponent implements OnInit {

  @Input() actionCodeInfo: auth.ActionCodeInfo;
  @Input() oobCode: string;
  @Output() success$: EventEmitter<auth.UserCredential> = new EventEmitter();
  @Output() error$: EventEmitter<auth.Error> = new EventEmitter();
  SCREEN = Screen;
  screen: Screen = Screen.wait;
  id = 'ngx-firebase-auth-oob-sign-in';
  emailFc: FormControl;
  fg: FormGroup;
  credential: auth.UserCredential = null;
  error: auth.Error = null;

  constructor(
    private _afAuth: AngularFireAuth,
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }





  async ngOnInit() {
    this.emailFc = new FormControl(StorageHelper.getSavedSignInLinkEmail(), [FormHelper.email]);
    this.fg = new FormGroup({email: this.emailFc});
    if (this.fg.invalid) {
      this.screen = Screen.form;
      return;
    }
    await this.submit();
  }

  async submit() {
    this.screen = Screen.wait;
    try {
      this.credential = await this.auth.signInWithEmailLink(this.emailFc.value);
      this.success$.emit(this.credential);
      this.screen = Screen.success;
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          FormHelper.setTransientError(this.emailFc, e.code);
          this.screen = Screen.form;
          break;
        default:
          this.error = e;
          this.error$.emit(e);
          this.screen = Screen.error;
          break;
      }
    }

  }

}
