import { NgxDateValidators } from './ngx-date-validators';
import { FormControl } from '@angular/forms';

describe('NgxDateValidators', () => {
  it('should create an instance', () => {
    expect(new NgxDateValidators()).toBeTruthy();
  });

  describe(`minDate(min)`, () => {
    let fn: any;
    let control: FormControl;
    beforeEach(() => {
      fn = NgxDateValidators.minDate('2019-07-04');
      control = new FormControl('');
    });
    it('should be null if the date is the min', () => {
      control.setValue('2019-07-04');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the date is after the min', () => {
      control.setValue('2019-07-22');
      expect(fn(control)).toBe(null);
    });
    it('should not null if the date is before the min', () => {
      control.setValue('2019-07-01');
      expect(fn(control)).toEqual({ minDate: true });
    });
    it('should be null if the min is null', () => {
      fn = NgxDateValidators.minDate(null);
      control.setValue('2019-07-22');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the min is undefined', () => {
      fn = NgxDateValidators.minDate(undefined);
      control.setValue('2019-07-22');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the min cannot be parsed', () => {
      fn = NgxDateValidators.minDate('foobar');
      control.setValue('2019-07-01');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the value cannot be parsed', () => {
      control.setValue('foobar');
      expect(fn(control)).toBe(null);
    });
  });

  describe(`maxDate(min)`, () => {
    let fn: any;
    let control: FormControl;
    beforeEach(() => {
      fn = NgxDateValidators.maxDate('2019-07-04');
      control = new FormControl('');
    });
    it('should be null if the date is the max', () => {
      control.setValue('2019-07-04');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the date is before the max', () => {
      control.setValue('2019-07-01');
      expect(fn(control)).toBe(null);
    });
    it('should not null if the date is after the max', () => {
      control.setValue('2019-07-22');
      expect(fn(control)).toEqual({ maxDate: true });
    });
    it('should be null if the max is null', () => {
      fn = NgxDateValidators.maxDate(null);
      control.setValue('2019-07-22');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the max is undefined', () => {
      fn = NgxDateValidators.maxDate(undefined);
      control.setValue('2019-07-22');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the max cannot be parsed', () => {
      fn = NgxDateValidators.maxDate('foobar');
      control.setValue('2019-07-22');
      expect(fn(control)).toBe(null);
    });
    it('should be null if the value cannot be parsed', () => {
      control.setValue('foobar');
      expect(fn(control)).toBe(null);
    });
  });
});
