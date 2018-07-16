import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardedRouteComponent } from './guarded-route.component';

describe('GuardedRouteComponent', () => {
  let component: GuardedRouteComponent;
  let fixture: ComponentFixture<GuardedRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardedRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardedRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
