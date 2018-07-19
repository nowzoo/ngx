import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxWindowTitleService } from './ngx-window-title.service';
import { NGX_WINDOW_TITLE_SEPARATOR } from './separator';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [],
})
export class NgxWindowTitleModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxWindowTitleModule,
      providers: [
        NgxWindowTitleService,
        {provide: NGX_WINDOW_TITLE_SEPARATOR, useValue: ' | '}
      ]
    };
  }
}
