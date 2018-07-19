import { NgxFormDemoModule } from './ngx-form-demo.module';

describe('NgxFormDemoModule', () => {
  let ngxFormDemoModule: NgxFormDemoModule;

  beforeEach(() => {
    ngxFormDemoModule = new NgxFormDemoModule();
  });

  it('should create an instance', () => {
    expect(ngxFormDemoModule).toBeTruthy();
  });
});
