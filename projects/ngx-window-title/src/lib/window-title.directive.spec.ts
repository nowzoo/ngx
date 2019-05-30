import { WindowTitleDirective } from './window-title.directive';
import { WindowTitleContext } from './api';

describe('WindowTitleDirective', () => {
  let directive: WindowTitleDirective;
  beforeEach(() => {
    directive = new WindowTitleDirective({} as any, {} as any, {} as any);
    directive.ngxWindowTitle =  WindowTitleContext.route;
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  it('should have templateRef', () => {
    expect(directive.templateRef).toBeTruthy();
  });
  it('should have route', () => {
    expect(directive.route).toBeTruthy();
  });
  it('should have service', () => {
    expect(directive.service).toBeTruthy();
  });

  describe('ngOnInit() and ngOnDestroy()', () => {
    let svc: any;
    beforeEach(() => {
      svc = {
        setWindowTitle: jasmine.createSpy(),
        removeWindowTitle: jasmine.createSpy()
      };
      spyOnProperty(directive, 'service').and.returnValue(svc);
    });
    it('should call setWindowTitle correctly', () => {
      directive.ngOnInit();
      expect(svc.setWindowTitle).toHaveBeenCalledWith(directive.route, directive.templateRef, directive.ngxWindowTitle);
    });
    it('should call removeWindowTitle correctly', () => {
      directive.ngOnInit();
      directive.ngOnDestroy();
      expect(svc.removeWindowTitle).toHaveBeenCalledWith(directive.route);
    });
  });
});
