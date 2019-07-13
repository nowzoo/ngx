import moment from 'moment';

export const MODEL_DATE_FORMAT = 'YYYY-MM-DD';
export const MODEL_TIME_FORMAT = 'HH:mm';




export interface IDateParseResult {
  year: number;
  month: number;
  date: number;
}
export interface ITimeParseResult {
  hour: number;
  minute: number;
}
