import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarControlComponent } from './calendar-control.component';
import { NgxDateTimeService, MODEL_DATE_FORMAT } from '@nowzoo/ngx-date-time-inputs';
import { FormControl } from '@angular/forms';

describe('CalendarControlComponent', () => {
  let component: CalendarControlComponent;
  let fixture: ComponentFixture<CalendarControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarControlComponent ],
      providers: [
        NgxDateTimeService
      ]
    })
    .overrideTemplate(CalendarControlComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleInputChange()', () => {
    let control: FormControl;
    beforeEach(() => {
      control = new FormControl('Jan 1 2016');
      spyOnProperty(component, 'control').and.returnValue(control);
      spyOn(component, 'propagateChange').and.callThrough();
      spyOn(component, 'propagateTouched').and.callThrough();
    });
    it('should propagate', () => {
      component.handleInputChange();
      expect(component.propagateChange).toHaveBeenCalledWith('2016-01-01');
    });
  });

  describe('get inputGroupClass()', () => {
    it('should respond to the bootstrapSize input', () => {
      expect(component.inputGroupClass).toBe('input-group');
      component.boostrapSize = 'lg';
      expect(component.inputGroupClass).toBe('input-group input-group-lg');
    });
  });

  describe('get inputClass()', () => {
    it('should respond to the invalid input', () => {
      expect(component.inputClass).toBe('form-control');
      component.invalid = true;
      expect(component.inputClass).toBe('form-control is-invalid');
      component.invalid = false;
      expect(component.inputClass).toBe('form-control');
      component.invalid = undefined;
      expect(component.inputClass).toBe('form-control');
    });
  });

  describe('get selectedDateForCal(): string', () => {
    it(' return a string', () => {
      expect(component.selectedDateForCal).toBe(component.date.format(MODEL_DATE_FORMAT));
    });
  });

  describe('onCalendarSelected(dateString: string)', () => {

    it('should writeValue with the string', () => {
      spyOn(component, 'writeValue').and.callThrough();
      component.onCalendarSelected('2019-07-01');
      expect(component.writeValue).toHaveBeenCalledWith('2019-07-01');
    });
    it('should propagate to the model', () => {
      spyOn(component, 'propagateChange').and.callThrough();
      spyOn(component, 'propagateTouched').and.callThrough();
      component.onCalendarSelected('2019-07-01');
      expect(component.propagateTouched).toHaveBeenCalledWith('2019-07-01');
      expect(component.propagateChange).toHaveBeenCalledWith('2019-07-01');
    });
  });


});
