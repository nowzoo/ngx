import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxSignInRedirectService } from './sign-in-redirect/sign-in-redirect.service';
import { NgxRouteBreadcrumbsService } from './breadcrumbs/breadcrumbs.service';
import { NgxRouteBreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NgxWindowTitleService } from './window-title/window-title.service';
import { NGX_WINDOW_TITLE_SEPARATOR } from './window-title/window-title-separator';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [NgxRouteBreadcrumbsComponent],
  exports: [NgxRouteBreadcrumbsComponent]
})
export class NgxRouteUtilsModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: NgxRouteUtilsModule, providers: [
      NgxSignInRedirectService,
      NgxRouteBreadcrumbsService,
      NgxWindowTitleService,
      {provide: NGX_WINDOW_TITLE_SEPARATOR, useValue: ' | '}
    ]};
  }
}
