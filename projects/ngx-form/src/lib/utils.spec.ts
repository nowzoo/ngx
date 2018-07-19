import { NgxFormUtils } from './utils';
import { NgxFormInvalidOn } from './invalid-on';
import { FormControl } from '@angular/forms';

describe('Utils', () => {
  it('should create an instance', () => {
    expect(new NgxFormUtils()).toBeTruthy();
  });

  describe('removeErrorKeys(control: AbstractControl, keys: string|string[])', () => {
    it('should remove an error key passed as string', () => {
      const control = new FormControl();
      control.setErrors({foo: true, bar: true});
      NgxFormUtils.removeErrorKeys(control, 'bar');
      expect(control.errors).toEqual({foo: true});
    });
    it('should remove an error key passed in array', () => {
      const control = new FormControl();
      control.setErrors({foo: true, bar: true});
      NgxFormUtils.removeErrorKeys(control, ['bar']);
      expect(control.errors).toEqual({foo: true});
    });
    it('should remove all error keys passed in array', () => {
      const control = new FormControl();
      control.setErrors({foo: true, bar: true});
      NgxFormUtils.removeErrorKeys(control, ['bar', 'foo']);
      expect(control.errors).toEqual(null);
    });
    it('should handle the case where the control has no errors', () => {
      const control = new FormControl();
      NgxFormUtils.removeErrorKeys(control, ['bar', 'foo']);
      expect(control.errors).toEqual(null);
    });
  });

  describe('showInvalid(control: AbstractControl, invalidOn?: NgxFormInvalidOn)', () => {
    it('should return false if the control is valid', () => {
      const control = new FormControl();
      expect(NgxFormUtils.showInvalid(control)).toBe(false);
    });
    it('should return true if the control is invalid and invalidOn = always', () => {
      const control = new FormControl();
      control.setErrors({foo: true});
      expect(control.touched).toBe(false);
      expect(control.dirty).toBe(false);
      expect(NgxFormUtils.showInvalid(control, 'always')).toBe(true);
    });
    it('should return true if the control is invalid && dirty and invalidOn = dirty', () => {
      const control = new FormControl();
      control.setErrors({foo: true});
      control.markAsDirty();
      expect(control.touched).toBe(false);
      expect(control.dirty).toBe(true);
      expect(NgxFormUtils.showInvalid(control, 'dirty')).toBe(true);
    });
    it('should return false if the control is invalid && not dirty and invalidOn = dirty', () => {
      const control = new FormControl();
      control.setErrors({foo: true});
      control.markAsPristine();
      expect(control.touched).toBe(false);
      expect(control.dirty).toBe(false);
      expect(NgxFormUtils.showInvalid(control, 'dirty')).toBe(false);
    });
    it('should return true if the control is invalid && touched and invalidOn = touched', () => {
      const control = new FormControl();
      control.setErrors({foo: true});
      control.markAsTouched();
      expect(control.touched).toBe(true);
      expect(control.dirty).toBe(false);
      expect(NgxFormUtils.showInvalid(control, 'touched')).toBe(true);
    });
    it('should return false if the control is invalid && not touched and invalidOn = touched', () => {
      const control = new FormControl();
      control.setErrors({foo: true});
      control.markAsUntouched();
      expect(control.touched).toBe(false);
      expect(control.dirty).toBe(false);
      expect(NgxFormUtils.showInvalid(control, 'touched')).toBe(false);
    });
  });
  describe('showInvalidKey(control: AbstractControl, key: string, invalidOn?: NgxFormInvalidOn)', () => {
    let showInvalidSpy;
    beforeEach(() => {
      showInvalidSpy = spyOn(NgxFormUtils, 'showInvalid').and.returnValue(true);
    });
    it('should return false if showInvalid is false', () => {
      const control = new FormControl();
      showInvalidSpy.and.returnValue(false);
      expect(NgxFormUtils.showInvalidKey(control, 'foo')).toBe(false);
    });
    it('should return false if the key is not in errors', () => {
      const control = new FormControl();
      spyOn(control, 'hasError').and.returnValue(false);
      showInvalidSpy.and.returnValue(true);
      expect(NgxFormUtils.showInvalidKey(control, 'foo')).toBe(false);
    });
    it('should return true if the key is in errors', () => {
      const control = new FormControl();
      spyOn(control, 'hasError').and.returnValue(true);
      showInvalidSpy.and.returnValue(true);
      expect(NgxFormUtils.showInvalidKey(control, 'foo')).toBe(true);
    });
  });

});
