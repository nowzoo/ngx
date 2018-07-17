import { NgxFireDemoModule } from './ngx-fire-demo.module';

describe('NgxFireDemoModule', () => {
  let ngxFireDemoModule: NgxFireDemoModule;

  beforeEach(() => {
    ngxFireDemoModule = new NgxFireDemoModule();
  });

  it('should create an instance', () => {
    expect(NgxFireDemoModule).toBeTruthy();
  });
});
