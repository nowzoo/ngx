import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverTemplatesComponent } from './popover-templates.component';

describe('PopoverTemplatesComponent', () => {
  let component: PopoverTemplatesComponent;
  let fixture: ComponentFixture<PopoverTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
