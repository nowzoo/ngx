import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
import chunk from 'lodash/chunk';
import { MODEL_DATE_FORMAT } from '../shared';


interface IDay {
  m: moment.Moment;
  disabled: boolean;
  currentMonth: boolean;
  today: boolean;
  selected: boolean;
}




@Component({
  selector: 'ngx-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  static ct = 0;


  selectedDate: moment.Moment = moment();

  displayedMonth: moment.Moment = moment().startOf('month');
  minDate: moment.Moment = null;
  maxDate: moment.Moment = null;
  displayTs: number;

  weeks: IDay[][] = [];

  monthOptions: moment.Moment[] = [];
  yearOptions: moment.Moment[] = [];
  prevMonthOption: moment.Moment;
  nextMonthOption: moment.Moment;
  prevYearOption: moment.Moment;
  nextYearOption: moment.Moment;



  id = `ngx-calendar-${++ CalendarComponent.ct}`;

  @Output() selectedChange: EventEmitter<string> = new EventEmitter();
  @Output() monthChange: EventEmitter<moment.Moment> = new EventEmitter();

  @Input()
  set selected(selected: string) {
    const m = moment(selected, MODEL_DATE_FORMAT);
    if (m.isValid) {
      this.selectedDate = moment(m);
    } else {
      this.selectedDate = moment();
    }
    this.displayedMonth = moment(this.selectedDate).startOf('month');
    this.updateDisplayedMonth();
  }

  @Input()
  set min(min: string) {
    if (! min ) {
      this.minDate = null;
    } else {
      const m = moment(min, MODEL_DATE_FORMAT);
      if (m.isValid) {
        this.minDate = moment(m);
      } else {
        this.minDate = null;
      }
    }

    this.updateDisplayedMonth();
  }

  @Input()
  set max(max: string) {
    if (!max) {
      this.maxDate = null;
    } else {
      const m = moment(max, MODEL_DATE_FORMAT);
      if (m.isValid) {
        this.maxDate = moment(m);
      } else {
        this.maxDate = null;
      }
      this.updateDisplayedMonth();
    }

  }




  constructor(

  ) { }

  ngOnInit() {
    this.updateDisplayedMonth();
  }


  selectDate(m: moment.Moment) {

    const str = m.format(MODEL_DATE_FORMAT);
    this.selected = str;
    this.selectedChange.emit(str);


  }

  updateDisplayedMonth() {
    this.displayTs = this.displayedMonth.valueOf();
    this.updateOptions();
    const today = moment();
    const days: IDay[] =  [];
    const otherDay = moment(this.displayedMonth).startOf('month').startOf('week');
    const lastDayInCal = moment(this.displayedMonth).endOf('month').endOf('week');
    while (otherDay.isSameOrBefore(lastDayInCal, 'day')) {
      days.push({
        m: moment(otherDay),
        currentMonth: this.displayedMonth.isSame(otherDay, 'month'),
        disabled: (this.minDate && otherDay.isBefore(this.minDate, 'day')) ||
          (this.maxDate && otherDay.isAfter(this.maxDate, 'day')),
        today: today.isSame(otherDay, 'day'),
        selected: this.selectedDate.isSame(otherDay, 'day')
      });
      otherDay.add(1, 'day');
    }
    this.weeks = chunk(days, 7);
    setTimeout(() => {
      this.monthChange.emit(this.displayedMonth);
    });
  }

  updateOptions() {
    const yearOptions: moment.Moment[] = [];
    for (let n = this.displayedMonth.year() - 1; n <= this.displayedMonth.year() + 5; n++) {
      yearOptions.push(moment(this.displayedMonth).year(n));
    }
    this.yearOptions = yearOptions;
    const monthOptions: moment.Moment[] = [];
    for (let n = 0; n < 12; n++) {
      monthOptions.push(moment(this.displayedMonth).month(n));
    }
    this.monthOptions = monthOptions;
    this.prevYearOption = moment(this.displayedMonth).subtract(1, 'year');
    this.nextYearOption = moment(this.displayedMonth).add(1, 'year');
    this.prevMonthOption = moment(this.displayedMonth).subtract(1, 'month');
    this.nextMonthOption = moment(this.displayedMonth).add(1, 'month');
  }

  setDisplayedMonth(m: moment.Moment) {
    this.displayedMonth = moment(m);
    this.updateDisplayedMonth();

  }




}
