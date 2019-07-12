import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapCalendarComponent } from './bootstrap-calendar.component';

describe('BootstrapCalendarComponent', () => {
  let component: BootstrapCalendarComponent;
  let fixture: ComponentFixture<BootstrapCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
