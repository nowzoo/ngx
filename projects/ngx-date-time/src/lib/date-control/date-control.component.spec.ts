import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateControlComponent } from './date-control.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DateControlComponent', () => {
  let component: DateControlComponent;
  let fixture: ComponentFixture<DateControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateControlComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
