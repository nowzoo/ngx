import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFirebaseAuthSharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxFirebaseAuthOobComponent } from './oob.component';
import { OobSignInComponent } from './oob-sign-in/oob-sign-in.component';
import { OobResetPasswordComponent } from './oob-reset-password/oob-reset-password.component';
import { OobRecoverEmailComponent } from './oob-recover-email/oob-recover-email.component';
import { OobVerifyEmailComponent } from './oob-verify-email/oob-verify-email.component';

@NgModule({
  declarations: [
    NgxFirebaseAuthOobComponent,
    OobSignInComponent,
    OobResetPasswordComponent,
    OobRecoverEmailComponent,
    OobVerifyEmailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxFirebaseAuthSharedModule
  ],
  exports: [
    NgxFirebaseAuthOobComponent
  ],
})
export class NgxFirebaseAuthOobModule { }
