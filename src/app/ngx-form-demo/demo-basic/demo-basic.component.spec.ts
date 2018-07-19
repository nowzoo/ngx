import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBasicComponent } from './demo-basic.component';

describe('DemoBasicComponent', () => {
  let component: DemoBasicComponent;
  let fixture: ComponentFixture<DemoBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
