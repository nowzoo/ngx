import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipTemplateComponent } from './tooltip-template.component';

describe('TooltipTemplateComponent', () => {
  let component: TooltipTemplateComponent;
  let fixture: ComponentFixture<TooltipTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
