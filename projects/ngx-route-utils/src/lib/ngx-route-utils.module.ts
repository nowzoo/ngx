import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSignInRedirectService } from './sign-in-redirect.service';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [],
  exports: []
})
export class NgxRouteUtilsModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: NgxRouteUtilsModule, providers: [NgxSignInRedirectService]};
  }
}
