import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '../../form-helper';


enum Screen {
  wait,
  form,
  success,
  error
}


@Component({
  selector: 'ngx-firebase-auth-oob-reset-password',
  templateUrl: './oob-reset-password.component.html',
  styleUrls: ['./oob-reset-password.component.scss']
})
export class OobResetPasswordComponent implements OnInit {

  @Input() actionCodeInfo: auth.ActionCodeInfo;
  @Input() oobCode: string;
  @Output() success$: EventEmitter<auth.UserCredential> = new EventEmitter();
  @Output() error$: EventEmitter<auth.Error> = new EventEmitter();
  SCREEN = Screen;
  screen: Screen = Screen.wait;
  id = 'ngx-firebase-auth-oob-reset-password';
  emailFc: FormControl;
  passwordFc: FormControl;
  fg: FormGroup;
  error: auth.Error = null;
  credential: auth.UserCredential;
  constructor(
    private _afAuth: AngularFireAuth,
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }



  ngOnInit() {
    this.emailFc = new FormControl(this.actionCodeInfo.data.email);
    this.passwordFc = new FormControl('', Validators.required);
    this.fg = new FormGroup({
      email: this.emailFc,
      password: this.passwordFc,
    });
    this.screen = Screen.form;
  }

  async submit() {
    this.screen = Screen.wait;
    const email = this.emailFc.value;
    const password = this.passwordFc.value;
    try {
      await this.auth.confirmPasswordReset(this.oobCode, password);
      this.credential = await this.auth.signInWithEmailAndPassword(email, password);
      this.success$.emit(this.credential);
      this.screen = Screen.success;
    } catch (e) {
      switch (e.code) {
        case 'auth/weak-password':
          FormHelper.setTransientError(this.passwordFc, e.code);
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
