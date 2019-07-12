import { NgxDateTimeUtils } from './ngx-date-time-utils';

describe('NgxDateTimeUtils', () => {
  it('should create an instance', () => {
    expect(new NgxDateTimeUtils()).toBeTruthy();
  });

  describe('calendarDays()', () => {
    it('should work for jan 2019', () => {
      const weeks = NgxDateTimeUtils.calendarDays(2019, 0);
      expect(weeks[0][0].m.year()).toBe(2018);
      expect(weeks[0][0].m.month()).toBe(11);
      expect(weeks[0][0].m.date()).toBe(30);
      expect(weeks[4][6].m.year()).toBe(2019);
      expect(weeks[4][6].m.month()).toBe(1);
      expect(weeks[4][6].m.date()).toBe(2);
    });
    it('should set selected', () => {
      const weeks = NgxDateTimeUtils.calendarDays(2019, 0, '2019-01-02');
      expect(weeks[0][3].selected).toBe(true);
      expect(weeks[0][4].selected).toBe(false);
      expect(weeks[0][2].selected).toBe(false);
    });
    it('should handle min', () => {
      const weeks = NgxDateTimeUtils.calendarDays(2019, 0, '2019-01-02', '2019-01-02');
      expect(weeks[0][3].disabled).toBe(false);
      expect(weeks[0][2].disabled).toBe(true);
    });
    it('should handle max', () => {
      const weeks = NgxDateTimeUtils.calendarDays(2019, 0, '2019-01-02', null, '2019-01-02');
      expect(weeks[0][4].disabled).toBe(true);
      expect(weeks[0][5].disabled).toBe(true);
      expect(weeks[0][3].disabled).toBe(false);
      expect(weeks[0][2].disabled).toBe(false);
    });
  });
});

