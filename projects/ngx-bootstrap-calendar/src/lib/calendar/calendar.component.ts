import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
import { MODEL_DATE_FORMAT } from '@nowzoo/ngx-date-time';

import chunk from 'lodash/chunk';

interface ICalendarDay {
  m: moment.Moment;
  disabled: boolean;
  currentMonth: boolean;
  today: boolean;
  selected: boolean;
}


@Component({
  selector: 'ngx-bootstrap-calendar',
  exportAs: 'ngxBootstrapCalendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  /**
   * The value as a string in `YYYY-MM-DD` format.
   */
  @Input()
  set selected(selected: string) {
    if ((!selected) || undefined === selected) {
      this.selectedDate = null;
    } else {
      const m = moment(selected, MODEL_DATE_FORMAT);
      if (m.isValid()) {
        this.selectedDate = moment(m);
        this.displayedMonth = moment(this.selectedDate).startOf('month');
      } else {
        this.selectedDate = null;
      }
    }

    this.updateDisplayedMonth();
  }

  get selected(): string|null {
    return this.selectedDate ? this.selectedDate.format(MODEL_DATE_FORMAT) : null;
  }

  /**
   * Optional. The minimum date (inclusive) as a string in `YYYY-MM-DD` format.
   */
  @Input()
  set min(min: string) {
    if ((! min) || undefined === min) {
      this.minDate = null;
    } else {
      const m = moment(min, MODEL_DATE_FORMAT);
      if (m.isValid()) {
        this.minDate = moment(m);
      } else {
        this.minDate = null;
      }
    }

    this.updateDisplayedMonth();
  }

  get min(): string|null {
    return this.minDate ? this.minDate.format(MODEL_DATE_FORMAT) : null;
  }

  /**
   * Optional. The maximum date (inclusive) as a string in `YYYY-MM-DD` format.
   */
  @Input()
  set max(max: string) {
    if (!max) {
      this.maxDate = null;
    } else {
      const m = moment(max, MODEL_DATE_FORMAT);
      if (m.isValid()) {
        this.maxDate = moment(m);
      } else {
        this.maxDate = null;
      }
    }
    this.updateDisplayedMonth();
  }

  get max(): string|null {
    return this.maxDate ? this.maxDate.format(MODEL_DATE_FORMAT) : null;
  }
  /**
   * Used to generate a unique DOM id for the dropdowns.
   */
  static ct = 0;

  /**
   * The unique DOM id. Used for the dropdowns.
   */
  id = `ngx-bootstrap-calendar-${++CalendarComponent.ct}`;


  /**
   * Internal moment object for the currently selected date.
   */
  selectedDate: moment.Moment = moment();

  /**
   * Moment to track the currently diplayed month.
   */
  displayedMonth: moment.Moment = moment().startOf('month');

  /**
   * Moment (or null) to track the current min date (see the `min` input below.)
   */
  minDate: moment.Moment = null;

  /**
   * Moment (or null) to track the current max date (see the `max` input below.)
   */
  maxDate: moment.Moment = null;

  /**
   * The current month and year as a number. Used in the template.
   */
  displayTs: number;


  /**
   * The days in the currently displayed month grouped by week.
   */
  weeks: ICalendarDay[][] = [];

  /**
   * The months in the currently displayed year.
   */
  monthOptions: moment.Moment[] = [];

  /**
   * Years surrounding the currently displayed year.
   */
  yearOptions: moment.Moment[] = [];

  /**
   * The month previous to the currently displayed month.
   */
  prevMonthOption: moment.Moment;

  /**
   * The month after the currently displayed month.
   */
  nextMonthOption: moment.Moment;

  /**
   * The year previous to the currently displayed year.
   */
  prevYearOption: moment.Moment;

  /**
   * The year after the currently displayed year.
   */
  nextYearOption: moment.Moment;





  /**
   * Emitted when the user selects a day. A string in `YYYY-MM-DD` format.
   */
  @Output() selectedChange: EventEmitter<string> = new EventEmitter();

  /**
   * Emitted when the user navigates to a month.
   */
  @Output() monthChange: EventEmitter<moment.Moment> = new EventEmitter();

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




  /**
   * Update the displayed month when instantiated.
   */
  ngOnInit() {
    this.updateDisplayedMonth();
  }

  /**
   * Used by the template to select a date.
   */
  selectDate(m: moment.Moment) {
    const str = m.format(MODEL_DATE_FORMAT);
    this.selected = str;
    this.selectedChange.emit(str);
  }

  /**
   * Used by the template controls to set the displayed month and year.
   */
  setDisplayedMonth(m: moment.Moment) {
    this.displayedMonth = moment(m).startOf('month');
    this.updateDisplayedMonth();
  }
  /**
   * Reset the moment objects and days to reflect the currently displayed month.
   */
  updateDisplayedMonth() {
    this.displayTs = this.displayedMonth.valueOf();
    const yearOptions: moment.Moment[] = [];
    let n: number;
    for (n = this.displayedMonth.year() - 1; n <= this.displayedMonth.year() + 5; n++) {
      yearOptions.push(moment(this.displayedMonth).year(n));
    }
    this.yearOptions = yearOptions;
    const monthOptions: moment.Moment[] = [];
    for (n = 0; n < 12; n++) {
      monthOptions.push(moment(this.displayedMonth).month(n));
    }
    this.monthOptions = monthOptions;
    this.prevYearOption = moment(this.displayedMonth).subtract(1, 'year');
    this.nextYearOption = moment(this.displayedMonth).add(1, 'year');
    this.prevMonthOption = moment(this.displayedMonth).subtract(1, 'month');
    this.nextMonthOption = moment(this.displayedMonth).add(1, 'month');
    this.weeks = CalendarComponent.calendarDays(
      this.displayedMonth.year(),
      this.displayedMonth.month(),
      this.selected,
      this.min,
      this.max
    );
    setTimeout(() => {
      this.monthChange.emit(this.displayedMonth);
    });
  }




}
