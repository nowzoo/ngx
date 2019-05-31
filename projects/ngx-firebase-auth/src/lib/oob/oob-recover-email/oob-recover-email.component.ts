import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

enum Screen {
  wait,
  form,
  success,
  error
}

@Component({
  selector: 'ngx-firebase-auth-oob-recover-email',
  templateUrl: './oob-recover-email.component.html',
  styleUrls: ['./oob-recover-email.component.scss']
})
export class OobRecoverEmailComponent  {

  @Input() actionCodeInfo: auth.ActionCodeInfo;
  @Input() oobCode: string;
  @Output() success$: EventEmitter<void> = new EventEmitter();
  @Output() error$: EventEmitter<auth.Error> = new EventEmitter();
  SCREEN = Screen;
  screen: Screen = Screen.wait;
  error: auth.Error;
  constructor(
    private _afAuth: AngularFireAuth
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  async submit() {
    this.screen = Screen.wait;
    try {
      await this.auth.applyActionCode(this.oobCode);
      this.success$.emit();
      this.screen = Screen.success;
    } catch (e) {
      this.error = e;
      this.error$.emit(e);
      this.screen = Screen.error;
    }
  }

}
