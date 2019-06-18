import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WaitComponent } from './wait/wait.component';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { PasswordWrapperComponent } from './password-wrapper/password-wrapper.component';
import { PersistenceControlComponent } from './persistence-control/persistence-control.component';

@NgModule({
  declarations: [
    WaitComponent,
    SuccessComponent,
    ErrorComponent,
    PasswordWrapperComponent,
    PersistenceControlComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    WaitComponent,
    SuccessComponent,
    ErrorComponent,
    PasswordWrapperComponent,
    PersistenceControlComponent
  ],
})
export class NgxFirebaseAuthSharedModule { }
