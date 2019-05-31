import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFireControlDirective } from './control.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxFireControlDirective,
  ],
  exports: [
    NgxFireControlDirective,
  ]
})
export class NgxFireModule { }
