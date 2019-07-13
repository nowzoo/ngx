import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDateTimeComponent } from './ngx-date-time.component';

describe('NgxDateTimeComponent', () => {
  let component: NgxDateTimeComponent;
  let fixture: ComponentFixture<NgxDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
