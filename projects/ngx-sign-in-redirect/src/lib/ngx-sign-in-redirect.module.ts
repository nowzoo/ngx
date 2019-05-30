import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxSignInRedirectService } from './ngx-sign-in-redirect.service';
import { NGX_SIGN_IN_DEFAULT_CONFIG, NGX_SIGN_IN_REDIRECT_CONFIG} from './api';


@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class NgxSignInRedirectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSignInRedirectModule,
      providers: [
        {provide: NGX_SIGN_IN_REDIRECT_CONFIG, useValue: NGX_SIGN_IN_DEFAULT_CONFIG},
        NgxSignInRedirectService
      ]
    };
  }
}
