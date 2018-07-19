import { NgxAppMsgDemoModule } from './ngx-app-msg-demo.module';

describe('NgxAppMsgDemoModule', () => {
  let ngxAppMsgDemoModule: NgxAppMsgDemoModule;

  beforeEach(() => {
    ngxAppMsgDemoModule = new NgxAppMsgDemoModule();
  });

  it('should create an instance', () => {
    expect(ngxAppMsgDemoModule).toBeTruthy();
  });
});
