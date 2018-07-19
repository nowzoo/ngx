import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoErrorComponent } from './demo-error.component';

describe('DemoErrorComponent', () => {
  let component: DemoErrorComponent;
  let fixture: ComponentFixture<DemoErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
