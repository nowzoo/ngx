import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';

import { CrumbDirective } from './crumb.directive';
import { NgxCrumbsService } from './ngx-crumbs.service';


@NgModule({
  declarations: [
    CrumbDirective,
  ],
  imports: [
    CommonModule,
    ObserversModule
  ],
  exports: [
    CrumbDirective
  ],
})
export class NgxCrumbsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxCrumbsModule,
      providers: [
        NgxCrumbsService
      ]
    };
  }
}
