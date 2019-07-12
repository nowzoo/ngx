import moment from 'moment';

export const MODEL_DATE_FORMAT = 'YYYY-MM-DD';
export const MODEL_TIME_FORMAT = 'HH:mm';


export interface ICalendarDay {
  m: moment.Moment;
  disabled: boolean;
  currentMonth: boolean;
  today: boolean;
  selected: boolean;
}
