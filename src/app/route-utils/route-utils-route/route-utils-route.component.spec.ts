import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteUtilsRouteComponent } from './route-utils-route.component';

describe('RouteUtilsRouteComponent', () => {
  let component: RouteUtilsRouteComponent;
  let fixture: ComponentFixture<RouteUtilsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteUtilsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteUtilsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
