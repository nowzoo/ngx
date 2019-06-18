import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseUpdateComponent } from '../base-update-component';


@Component({
  selector: 'ngx-firebase-auth-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent extends BaseUpdateComponent implements OnInit, OnDestroy {
  id = 'ngx-firebase-auth-update-password';

  constructor(
    afAuth: AngularFireAuth
  ) {
    super(afAuth);
  }

  createFg(): FormGroup {

    return new FormGroup({password: this.passwordFc});
  }

  async handleSubmit() {
    await this.user.updatePassword(this.passwordFc.value);
  }
}
