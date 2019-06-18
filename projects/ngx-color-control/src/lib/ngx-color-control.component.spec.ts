import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxColorControlComponent } from './ngx-color-control.component';

describe('NgxColorControlComponent', () => {
  let component: NgxColorControlComponent;
  let fixture: ComponentFixture<NgxColorControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxColorControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxColorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
