import { NgxAbstractDateControl } from './ngx-abstract-date-control';
import { MODEL_DATE_FORMAT } from './shared';
class InstanceComponent extends NgxAbstractDateControl {
  constructor() {
    super();
  }
  displayFormat = 'LL';
}
describe('NgxAbstractDateControl', () => {
  let component: InstanceComponent;
  beforeEach(() => {
    component = new InstanceComponent();
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
  it('should have control', () => {
    expect(component.control).toBeTruthy();
  });
  it('should have date', () => {
    expect(component.date).toBeTruthy();
  });

  describe('writeValue(dateString: string)', () => {
    it('should set the value of the date and the control', () => {
      component.writeValue('2019-07-04');
      expect(component.date.format(MODEL_DATE_FORMAT)).toBe('2019-07-04');
      expect(component.control.value).toBe(component.date.format('LL'));
    });
  });

  describe('registerOnChange(fn: (_: any) => void)', () => {
    it('should set the value of the date and the control', () => {
      const fn = (_: any) => {};
      component.registerOnChange(fn);
      expect(component.propagateChange).toBe(fn);
    });
  });
  describe('registerOnTouched(fn: any)', () => {
    it('should set the value of the date and the control', () => {
      const fn = () => { };
      component.registerOnTouched(fn);
      expect(component.propagateTouched).toBe(fn);
    });
  });

  describe('handleInputChange()', () => {
    beforeEach(() => {
      component.control.setValue('July 4, 2019', {emitEvent: false});
      spyOn(component, 'propagateChange').and.callThrough();
      spyOn(component, 'propagateTouched').and.callThrough();
    });
    it('should propagate the change', () => {
      component.handleInputChange();
      expect(component.propagateChange).toHaveBeenCalledWith('2019-07-04');
    });
    it('should propagate touched', () => {
      component.handleInputChange();
      expect(component.propagateTouched).toHaveBeenCalledWith('2019-07-04');
    });
    it('should set the value of the control to the localized format', () => {
      component.handleInputChange();
      expect(component.control.value).toBe(component.date.format(component.displayFormat));
    });
  });


});
