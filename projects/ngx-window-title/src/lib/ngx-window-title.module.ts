import { NgModule, ModuleWithProviders } from '@angular/core';
import { ObserversModule } from '@angular/cdk/observers';

import { WindowTitleComponent } from './window-title.component';
import { WindowTitleDirective } from './window-title.directive';
import { CommonModule } from '@angular/common';
import { NgxWindowTitleService } from './ngx-window-title.service';

@NgModule({
  declarations: [
    WindowTitleComponent,
    WindowTitleDirective
  ],
  imports: [
    CommonModule,
    ObserversModule
  ],
  exports: [
    WindowTitleComponent,
    WindowTitleDirective
  ]
})
export class NgxWindowTitleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxWindowTitleModule,
      providers: [NgxWindowTitleService]
    };
  }
}
