import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormHelper } from '../../form-helper';
import { BaseComponent } from '../base-component';





@Component({
  selector: 'ngx-firebase-auth-reauthenticate',
  templateUrl: './reauthenticate.component.html',
  styleUrls: ['./reauthenticate.component.css']
})
export class ReauthenticateComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() success: EventEmitter<auth.UserCredential> = new EventEmitter();
  @Output() error: EventEmitter<auth.Error> = new EventEmitter();
  fg: FormGroup;
  passwordFc: FormControl;
  id = 'ngx-firebase-auth-reauthenticate';
  submitting = false;
  constructor(
    afAuth: AngularFireAuth
  ) {
    super(afAuth);
  }



  ngOnInit() {
    super.ngOnInit();
    this.passwordFc = new FormControl('', [Validators.required]);
    this.fg = new FormGroup({
      password: this.passwordFc
    });
  }



  async submit() {
    if (! this.user) {
      return;
    }
    this.submitting = true;
    const password = this.passwordFc.value;
    const cred: auth.AuthCredential = auth.EmailAuthProvider.credential(this.user.email, password);
    try {
      const userCred: auth.UserCredential = await this.user.reauthenticateWithCredential(cred);
      this.success.emit(userCred);
      this.submitting = false;
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          FormHelper.setTransientError(this.passwordFc, error.code);
          break;
        default:
          this.error.emit(error);
          break;
      }
      this.submitting = false;
    }

  }

}
