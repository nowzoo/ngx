import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFirebaseAuthSharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFirebaseAuthComponent } from './auth.component';


@NgModule({
  declarations: [
    NgxFirebaseAuthComponent
  ],
  imports: [
    CommonModule,
    NgxFirebaseAuthSharedModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxFirebaseAuthComponent
  ]
})
export class NgxFirebaseAuthModule { }
