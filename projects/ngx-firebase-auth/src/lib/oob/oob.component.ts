import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { IOobResult, OobContext } from '../api';

enum Screen {
  wait,
  resetPassword,
  signIn,
  recoverEmail,
  verifyEmail,
  error
}
@Component({
  selector: 'ngx-firebase-auth-oob',
  templateUrl: './oob.component.html',
  styleUrls: ['./oob.component.scss']
})
export class NgxFirebaseAuthOobComponent implements OnInit {

  @Output() context: EventEmitter<OobContext> = new EventEmitter();
  @Output() result: EventEmitter<IOobResult> = new EventEmitter();
  SCREEN = Screen;
  screen: Screen = Screen.wait;
  error: auth.Error = null;
  actionCodeInfo: auth.ActionCodeInfo = null;
  paramOobCode: string = null;
  paramContext: OobContext = null;

  constructor(
    private _route: ActivatedRoute,
    private _afAuth: AngularFireAuth
  ) { }


  get queryParams(): {[key: string]: any} {
    return this._route.snapshot.queryParams;
  }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  async ngOnInit() {
    this._initRawParams();
    await this._checkCode();
    this._setInitialScreen();
  }

  _initRawParams() {
    this.paramOobCode = this.queryParams.oobCode || null;
    switch (this.queryParams.mode) {
      case 'verifyEmail':
        this.paramContext = OobContext.verifyEmail;
        break;
      case 'recoverEmail':
        this.paramContext = OobContext.recoverEmail;
        break;
      case 'resetPassword':
        this.paramContext = OobContext.resetPassword;
        break;
      case 'signIn':
        this.paramContext = OobContext.signIn;
        break;
    }
    if (this.paramContext) {
      this.context.emit(this.paramContext);
    }

  }

  async _checkCode() {
    if (! this.paramOobCode) {
      this.error = {code: 'navigation', message: 'It looks like you got to this page accidentally.'};
    } else {
      try {
        this.actionCodeInfo = await this.auth.checkActionCode(this.paramOobCode);
        switch (this.actionCodeInfo.operation) {
          case 'PASSWORD_RESET':
            this.paramContext = OobContext.resetPassword;
            break;
          case 'VERIFY_EMAIL':
            this.paramContext = OobContext.verifyEmail;
            break;
          case 'RECOVER_EMAIL':
            this.paramContext = OobContext.recoverEmail;
            break;
          case 'EMAIL_SIGNIN':
            this.paramContext = OobContext.signIn;
            break;
          default:
            this.error = {code: 'application', message: 'Unknown operation returned by checkActionCode.'};
            break;
        }
        if (! this.error) {
          this.context.emit(this.paramContext);
        }

      } catch (e) {
        this.error = e;
      }
    }
  }

  _setInitialScreen() {
    if (this.error) {
      this.result.emit({
        context: this.paramContext || 'navigationError',
        error: this.error,
        actionCodeInfo: this.actionCodeInfo
      });
      this.screen = Screen.error;
      return;
    }

    switch (this.paramContext) {
      case OobContext.recoverEmail:
        this.screen = Screen.recoverEmail;
        break;
      case OobContext.signIn:
        this.screen = Screen.signIn;
        break;
      case OobContext.resetPassword:
        this.screen = Screen.resetPassword;
        break;
      case OobContext.verifyEmail:
        this.screen = Screen.verifyEmail;
        break;
    }
  }



  onSuccess(credential?: auth.UserCredential) {
    const result: IOobResult = {
      context: this.paramContext,
      actionCodeInfo: this.actionCodeInfo,
    };
    if (credential) {
      result.credential = credential;
    }
    this.result.emit(result);
  }

  onError(error: auth.Error) {
    const result: IOobResult = {
      context: this.paramContext,
      actionCodeInfo: this.actionCodeInfo,
      error
    };
    this.result.emit(result);
    this.error = error;
    this.screen = Screen.error;
  }

}
