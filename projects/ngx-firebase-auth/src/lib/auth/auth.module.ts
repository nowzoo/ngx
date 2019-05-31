import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFirebaseAuthComponent } from './auth.component';


@NgModule({
  declarations: [
    NgxFirebaseAuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxFirebaseAuthComponent
  ]
})
export class NgxFirebaseAuthModule { }
