import { NgxRouteUtilsDemoModule } from './ngx-route-utils-demo.module';

describe('NgxRouteUtilsDemoModule', () => {
  let routeUtilsModule: NgxRouteUtilsDemoModule;

  beforeEach(() => {
    routeUtilsModule = new NgxRouteUtilsDemoModule();
  });

  it('should create an instance', () => {
    expect(routeUtilsModule).toBeTruthy();
  });
});
