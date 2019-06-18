import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { NgxFirebaseAuthSharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReauthenticateComponent } from './reauthenticate/reauthenticate.component';

@NgModule({
  declarations: [
    UpdatePasswordComponent,
    UpdateEmailComponent,
    ReauthenticateComponent
  ],
  imports: [
    CommonModule,
    NgxFirebaseAuthSharedModule,
    ReactiveFormsModule
  ],
  exports: [
    UpdatePasswordComponent,
    UpdateEmailComponent,
    ReauthenticateComponent
  ]
})
export class NgxFirebaseAuthUserModule { }
