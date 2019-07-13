import { NgxAbstractTimeControl } from './ngx-abstract-time-control';
import { MODEL_TIME_FORMAT } from './shared';
class InstanceComponent extends NgxAbstractTimeControl {
  constructor() {
    super();
  }
  displayFormat = 'LT';
}

describe('NgxAbstractTimeControl', () => {
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
  describe('writeValue(timeString: string)', () => {
    it('should set the value of the date and the control', () => {
      component.writeValue('09:30');
      expect(component.date.format(MODEL_TIME_FORMAT)).toBe('09:30');
      expect(component.control.value).toBe(component.date.format('LT'));
    });
  });
  describe('registerOnChange(fn: (_: any) => void)', () => {
    it('should set the value of the date and the control', () => {
      const fn = (_: any) => { };
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
      component.control.setValue('12:30 pm', { emitEvent: false });
      spyOn(component, 'propagateChange').and.callThrough();
      spyOn(component, 'propagateTouched').and.callThrough();
    });
    it('should propagate the change', () => {
      component.handleInputChange();
      expect(component.propagateChange).toHaveBeenCalledWith('12:30');
    });
    it('should propagate touched', () => {
      component.handleInputChange();
      expect(component.propagateTouched).toHaveBeenCalledWith('12:30');
    });
    it('should set the value of the control to the localized format', () => {
      component.handleInputChange();
      expect(component.control.value).toBe(component.date.format(component.displayFormat));
    });
  });

});
