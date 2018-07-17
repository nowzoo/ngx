import { NgxSignInRedirectServiceDemoModule } from './ngx-sign-in-redirect-service-demo.module';

describe('NgxSignInRedirectServiceDemoModule', () => {
  let ngxSignInRedirectServiceDemoModule: NgxSignInRedirectServiceDemoModule;

  beforeEach(() => {
    ngxSignInRedirectServiceDemoModule = new NgxSignInRedirectServiceDemoModule();
  });

  it('should create an instance', () => {
    expect(ngxSignInRedirectServiceDemoModule).toBeTruthy();
  });
});
