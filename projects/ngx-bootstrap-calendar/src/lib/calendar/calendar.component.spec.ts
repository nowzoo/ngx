import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MomentModule } from 'ngx-moment';
import moment from 'moment';

import { CalendarComponent } from './calendar.component';
import { MODEL_DATE_FORMAT } from '@nowzoo/ngx-date-time-inputs';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      imports: [
        MomentModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call', () => {
      spyOn(component, 'updateDisplayedMonth').and.callFake(() => { });
      component.ngOnInit();
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });
  });

  describe('get and set selected()', () => {
    beforeEach(() => {
      spyOn(component, 'updateDisplayedMonth').and.callFake(() => {});
    });
    it('should be  a string if selected is set', () => {
      component.selected = '2019-07-04';
      expect(component.selected).toBe('2019-07-04');
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });
    it('should be null if selected is undefined', () => {
      component.selected = undefined;
      expect(component.selected).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();

    });
    it('should return null if selected is null', () => {
      component.selected = null;
      expect(component.selected).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();

    });
    it('should return null if selected is not parseable', () => {
      component.selected = 'foobar';
      expect(component.selected).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });

  });

  describe('get and set min()', () => {
    beforeEach(() => {
      spyOn(component, 'updateDisplayedMonth').and.callFake(() => { });
    });
    it('should be  a string if min is set', () => {
      component.min = '2019-07-04';
      expect(component.min).toBe('2019-07-04');
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });
    it('should be null if min is undefined', () => {
      component.min = undefined;
      expect(component.min).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();

    });
    it('should return null if selected is null', () => {
      component.selected = null;
      expect(component.selected).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();

    });
    it('should return null if selected is not parseable', () => {
      component.min = 'foobar';
      expect(component.min).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });

  });

  describe('get and set max()', () => {
    beforeEach(() => {
      spyOn(component, 'updateDisplayedMonth').and.callFake(() => { });
    });
    it('should be  a string if max is set', () => {
      component.max = '2019-07-04';
      expect(component.max).toBe('2019-07-04');
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });
    it('should be null if max is undefined', () => {
      component.max = undefined;
      expect(component.max).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();

    });
    it('should return null if selected is null', () => {
      component.selected = null;
      expect(component.selected).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();

    });
    it('should return null if selected is not parseable', () => {
      component.max = 'foobar';
      expect(component.max).toBe(null);
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });

  });

  describe('selectDate(m: moment.Moment)', () => {
    it('should make the right calls', () => {
      spyOn(component.selectedChange, 'emit').and.callFake(() => { });
      spyOn(component, 'updateDisplayedMonth').and.callFake(() => { });
      const m = moment().year(2019).month(6).date(4);
      component.selectDate(m);
      expect(component.selected).toBe('2019-07-04');
      expect(component.selectedChange.emit).toHaveBeenCalledWith('2019-07-04');
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });

  });

  describe('setDisplayedMonth(m: moment.Moment)', () => {
    it('should make the right calls', () => {
      spyOn(component, 'updateDisplayedMonth').and.callFake(() => { });
      const m = moment().year(2019).month(6).date(4);
      component.setDisplayedMonth(m);
      expect(component.displayedMonth.format(MODEL_DATE_FORMAT)).toBe('2019-07-01');
      expect(component.updateDisplayedMonth).toHaveBeenCalledWith();
    });
  });
  describe('updateDisplayedMonth()', () => {
    it('should populate weeks', () => {
      const m = moment().year(2019).month(6).date(1);
      component.setDisplayedMonth(m);
      expect(component.weeks.length).toBeGreaterThan(4);
    });
    it('should emit monthchange', fakeAsync(() => {
      spyOn(component.monthChange, 'emit').and.callFake(() => { });
      const m = moment().year(2019).month(6).date(1);
      component.setDisplayedMonth(m);
      tick();
      expect(component.monthChange.emit).toHaveBeenCalledWith(component.displayedMonth);
    }));
  });
});
