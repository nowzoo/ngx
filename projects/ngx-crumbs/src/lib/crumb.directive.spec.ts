import { CrumbDirective } from './crumb.directive';

describe('CrumbDirective', () => {
  let directive: CrumbDirective;
  beforeEach(() => {
    directive = new CrumbDirective({} as any, {} as any, {} as any);
    directive.title = 'abc';
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
        setRouteBreadcrumb: jasmine.createSpy(),
        removeRouteBreadcrumb: jasmine.createSpy()
      };
      spyOnProperty(directive, 'service').and.returnValue(svc);
    });
    it('should call setRouteBreadcrumb correctly', () => {
      directive.ngOnInit();
      expect(svc.setRouteBreadcrumb).toHaveBeenCalledWith(directive.route, directive.templateRef, directive.title);
    });
    it('should call removeRouteBreadcrumb correctly', () => {
      directive.ngOnInit();
      directive.ngOnDestroy();
      expect(svc.removeRouteBreadcrumb).toHaveBeenCalledWith(directive.route);
    });
  });
});
