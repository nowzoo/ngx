import { FormHelper } from './form-helper';
import { FormControl, Validators } from '@angular/forms';

describe('FormHelper', () => {
  describe('FormHelper.setTransientError(fc: FormControl, key: string, errorValue = true)', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('foo', Validators.required);
    });
    it('should set the error key to true if not passed an error value', () => {
      FormHelper.setTransientError(fc, 'bar');
      expect(fc.hasError('bar')).toBe(true);
      expect(fc.errors.bar).toBe(true);
    });
    it('should set the error key to the value if passed an error value', () => {
      FormHelper.setTransientError(fc, 'bar', 'foo');
      expect(fc.hasError('bar')).toBe(true);
      expect(fc.errors.bar).toBe('foo');
    });
    it('should clear the error after the next change, but maintaining other error keys, if any', () => {
      spyOn(FormHelper, 'clearError').and.callThrough();
      FormHelper.setTransientError(fc, 'bar');
      expect(fc.hasError('bar')).toBe(true);
      fc.setValue('');
      expect(fc.hasError('bar')).toBe(false);
      expect(fc.hasError('required')).toBe(true);
      FormHelper.setTransientError(fc, 'bar');
      expect(fc.hasError('bar')).toBe(true);
      fc.setValue('sfgfsg');
      expect(fc.hasError('bar')).toBe(false);
      expect(fc.errors).toBe(null);
    });
  });

  describe('FormHelper.clearError(fc: FormControl, key: string)', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('foo');
    });
    it('should leave any other errors alone', () => {
      fc.setErrors({a: true, b: true});
      expect(fc.hasError('a')).toBe(true);
      expect(fc.hasError('b')).toBe(true);
      FormHelper.clearError(fc, 'a');
      expect(fc.hasError('a')).toBe(false);
      expect(fc.hasError('b')).toBe(true);
    });
    it('should set errors to null', () => {
      fc.setErrors({a: true, b: true});
      expect(fc.hasError('a')).toBe(true);
      expect(fc.hasError('b')).toBe(true);
      FormHelper.clearError(fc, 'a');
      expect(fc.hasError('a')).toBe(false);
      expect(fc.hasError('b')).toBe(true);
      FormHelper.clearError(fc, 'b');
      expect(fc.hasError('b')).toBe(false);
      expect(fc.errors).toBe(null);

    });
  });
  describe('FormHelper.email(fc: FormControl)', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('foo', [FormHelper.email]);
    });
    it('should be required for a non string', () => {
      fc.setValue(null);
      expect(fc.errors).toEqual({required: true});
    });
    it('should be required for an empty string', () => {
      fc.setValue('    ');
      expect(fc.errors).toEqual({required: true});
    });
    it('should be email for an non email', () => {
      fc.setValue('foo@');
      expect(fc.errors).toEqual({email: true});
    });
    it('should be null for an email', () => {
      fc.setValue('foo@b');
      expect(fc.errors).toEqual(null);
    });
  });

  describe('FormHelper.nonEmptyValidator(fc: FormControl)', () => {
    let fc: FormControl;
    beforeEach(() => {
      fc = new FormControl('foo');
    });
    it('should be {required: true} for an empty string', () => {
      fc.setValue('');
      expect(FormHelper.nonEmptyValidator(fc)).toEqual({required: true});
    });
    it('should be {required: true} for an emptyish string', () => {
      fc.setValue('    ');
      expect(FormHelper.nonEmptyValidator(fc)).toEqual({required: true});
    });
    it('should be {required: true} for a non string', () => {
      fc.setValue(899);
      expect(FormHelper.nonEmptyValidator(fc)).toEqual({required: true});
      fc.setValue(null);
      expect(FormHelper.nonEmptyValidator(fc)).toEqual({required: true});
    });
    it('should be null for a non-empty string', () => {
      fc.setValue('f');
      expect(FormHelper.nonEmptyValidator(fc)).toEqual(null);
    });
  });
});
