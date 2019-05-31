import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NGX_FORM_DEFAULT_OPTIONS, NGX_FORM_OPTIONS} from './shared';
import { NgxControlValidityDirective } from './ngx-control-validity.directive';
import { NgxControlInvalidClassDirective } from './ngx-control-invalid-class.directive';
import { NgxControlValidClassDirective } from './ngx-control-valid-class.directive';
import { NgxControlErrorComponent } from './ngx-control-error.component';
import { NgxControlSuccessComponent } from './ngx-control-success.component';
import { NgxControlPendingComponent } from './ngx-control-pending.component';



@NgModule({
  declarations: [
    NgxControlValidityDirective,
    NgxControlInvalidClassDirective,
    NgxControlValidClassDirective,
    NgxControlErrorComponent,
    NgxControlSuccessComponent,
    NgxControlPendingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxControlValidityDirective,
    NgxControlInvalidClassDirective,
    NgxControlValidClassDirective,
    NgxControlErrorComponent,
    NgxControlSuccessComponent,
    NgxControlPendingComponent,
  ],
  providers: [
    {provide: NGX_FORM_OPTIONS, useValue: NGX_FORM_DEFAULT_OPTIONS}
  ]
})
export class NgxFormModule {

}
