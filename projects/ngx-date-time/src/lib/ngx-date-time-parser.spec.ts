import { NgxDateTimeParser } from './ngx-date-time-parser';
import moment from 'moment';

describe('NgxDateTimeParser', () => {

  describe('parseTime(timeStr)', () => {

    it('should handle "3 pm"', () => {
      expect(NgxDateTimeParser.parseTime('3 pm')).toEqual({ hour: 15, minute: 0 });
    });
    it('should handle "3 PM"', () => {
      expect(NgxDateTimeParser.parseTime('3 PM')).toEqual({ hour: 15, minute: 0 });
    });
    it('should handle "3 Am"', () => {
      expect(NgxDateTimeParser.parseTime('3 Am')).toEqual({ hour: 3, minute: 0 });
    });
    it('should handle "3:24 Pm"', () => {
      expect(NgxDateTimeParser.parseTime('3:24 Pm')).toEqual({ hour: 15, minute: 24 });
    });
    it('should handle "3:24"', () => {
      expect(NgxDateTimeParser.parseTime('3:24')).toEqual({ hour: 3, minute: 24 });
    });
    it('should handle ""', () => {
      expect(NgxDateTimeParser.parseTime('')).toEqual({ hour: 0, minute: 0 });
    });
    it('should handle "23:11"', () => {
      expect(NgxDateTimeParser.parseTime('23:11')).toEqual({ hour: 23, minute: 11 });
    });
  });

  describe('isLocaleMonthFirst', () => {
    let savedLocale: string;
    beforeEach(() => {
      savedLocale = moment.locale();
    });
    afterEach(() => {
      moment.locale(savedLocale);
    });
    it('should be true for en', () => {
      moment.locale('en');
      expect(NgxDateTimeParser.isLocaleMonthFirst()).toBe(true);
    });
    it('should be false for fr', () => {
      moment.locale('fr');
      expect(NgxDateTimeParser.isLocaleMonthFirst()).toBe(false);
    });
  });

  describe('parseDate(dataeStr)', () => {
    let currYear: number;
    let currMonth: number;
    let currDate: number;
    beforeEach(() => {
      currYear = moment().year();
      currMonth = moment().month();
      currDate = moment().date();

    });
    it('should handle various strings with a us locale', () => {
      spyOn(NgxDateTimeParser, 'isLocaleMonthFirst').and.callFake(() => true);
      expect(NgxDateTimeParser.parseDate('feb 3')).toEqual({ year: currYear, month: 1, date: 3 });
      expect(NgxDateTimeParser.parseDate('3 feb')).toEqual({ year: currYear, month: 1, date: 3 });
      expect(NgxDateTimeParser.parseDate('3 feb 2016')).toEqual({ year: 2016, month: 1, date: 3 });
      expect(NgxDateTimeParser.parseDate('February 22 2016')).toEqual({ year: 2016, month: 1, date: 22 });
      expect(NgxDateTimeParser.parseDate('February 22, 2016')).toEqual({ year: 2016, month: 1, date: 22 });
      expect(NgxDateTimeParser.parseDate('12/11/1965')).toEqual({ year: 1965, month: 11, date: 11 });
      expect(NgxDateTimeParser.parseDate('1965')).toEqual({ year: 1965, month: currMonth, date: currDate });
      expect(NgxDateTimeParser.parseDate('1965/12/22')).toEqual({ year: 1965, month: 11, date: 22 });
    });
    it('should handle various strings with a non-us locale', () => {
      spyOn(NgxDateTimeParser, 'isLocaleMonthFirst').and.callFake(() => false);
      expect(NgxDateTimeParser.parseDate('feb 3')).toEqual({ year: currYear, month: 1, date: 3 });
      expect(NgxDateTimeParser.parseDate('3 feb')).toEqual({ year: currYear, month: 1, date: 3 });
      expect(NgxDateTimeParser.parseDate('3 feb 2016')).toEqual({ year: 2016, month: 1, date: 3 });
      expect(NgxDateTimeParser.parseDate('February 22 2016')).toEqual({ year: 2016, month: 1, date: 22 });
      expect(NgxDateTimeParser.parseDate('February 22, 2016')).toEqual({ year: 2016, month: 1, date: 22 });
      expect(NgxDateTimeParser.parseDate('12/11/1965')).toEqual({ year: 1965, month: 10, date: 12 });
      expect(NgxDateTimeParser.parseDate('1965')).toEqual({ year: 1965, month: currMonth, date: currDate });
      expect(NgxDateTimeParser.parseDate('1965/12/22')).toEqual({ year: 1965, month: 11, date: 22 });
    });
  });
});
