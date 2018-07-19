import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFormErrorComponent } from './error/error.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxFormErrorComponent
  ],
  exports: [
    NgxFormErrorComponent
  ]
})
export class NgxFormModule { }
