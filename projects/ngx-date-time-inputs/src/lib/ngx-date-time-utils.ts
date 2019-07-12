import moment from 'moment';
import { ICalendarDay, MODEL_DATE_FORMAT } from './shared';
import chunk from 'lodash/chunk';

export class NgxDateTimeUtils {

  static calendarDays(
    year: number, month: number, selected: string = null, min: string = null, max: string = null
  ): ICalendarDay[][] {
    const days: ICalendarDay[] = [];
    const monthStart = moment().year(year).month(month).startOf('month');
    const selectedMoment = selected !== null ? moment(selected, MODEL_DATE_FORMAT) : null;
    const minMoment = min !== null ? moment(min, MODEL_DATE_FORMAT) : null;
    const maxMoment = max !== null ? moment(max, MODEL_DATE_FORMAT) : null;
    const today = moment();
    const otherDay = moment(monthStart).startOf('month').startOf('week');
    const lastDayInCal = moment(monthStart).endOf('month').endOf('week');
    while (otherDay.isSameOrBefore(lastDayInCal, 'day')) {
      days.push({
        m: moment(otherDay),
        currentMonth: monthStart.isSame(otherDay, 'month'),
        disabled: (minMoment !== null && minMoment.isValid() && otherDay.isBefore(minMoment, 'day')) ||
          (maxMoment !== null && maxMoment.isValid() && otherDay.isAfter(maxMoment, 'day')),
        today: today.isSame(otherDay, 'day'),
        selected: selectedMoment && selectedMoment.isValid() && selectedMoment.isSame(otherDay, 'day')
      });
      otherDay.add(1, 'day');
    }
    return chunk(days, 7);
  }
}
