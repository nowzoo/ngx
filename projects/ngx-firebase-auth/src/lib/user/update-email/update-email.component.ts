import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { BaseUpdateComponent } from '../base-update-component';


@Component({
  selector: 'ngx-firebase-auth-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent extends BaseUpdateComponent implements OnInit, OnDestroy {

  id = 'ngx-firebase-auth-update-email';

  constructor(
    afAuth: AngularFireAuth
  ) {
    super(afAuth);
  }

  createFg(): FormGroup {
    return new FormGroup({email: this.emailFc});
  }

  async handleSubmit() {
    await this.user.updateEmail(this.emailFc.value);
  }
}
