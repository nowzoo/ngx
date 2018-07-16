import { RouteUtilsModule } from './route-utils.module';

describe('RouteUtilsModule', () => {
  let routeUtilsModule: RouteUtilsModule;

  beforeEach(() => {
    routeUtilsModule = new RouteUtilsModule();
  });

  it('should create an instance', () => {
    expect(routeUtilsModule).toBeTruthy();
  });
});
