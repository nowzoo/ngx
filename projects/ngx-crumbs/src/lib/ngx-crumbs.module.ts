import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';

import { CrumbDirective } from './crumb.directive';
import { NgxCrumbsService } from './ngx-crumbs.service';
import { CalendarModalComponent } from './ngx-date-time-inputs/calendar-modal/calendar-modal.component';


@NgModule({
  declarations: [
    CrumbDirective,
    CalendarModalComponent,
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
