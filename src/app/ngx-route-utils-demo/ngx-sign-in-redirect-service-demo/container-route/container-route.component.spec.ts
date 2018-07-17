import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRouteComponent } from './container-route.component';

describe('ContainerRouteComponent', () => {
  let component: ContainerRouteComponent;
  let fixture: ComponentFixture<ContainerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
