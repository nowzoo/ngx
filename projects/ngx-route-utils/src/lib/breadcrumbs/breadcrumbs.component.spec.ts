import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxRouteBreadcrumbsComponent } from './breadcrumbs.component';
import { NgxRouteBreadcrumbsService } from './breadcrumbs.service';
import { BehaviorSubject } from 'rxjs';
describe('NgxRouteBreadcrumbsComponent', () => {
  let component: NgxRouteBreadcrumbsComponent;
  let fixture: ComponentFixture<NgxRouteBreadcrumbsComponent>;
  let bc: BehaviorSubject<any>;
  beforeEach(() => {
    bc = new BehaviorSubject([]);
    TestBed.configureTestingModule({
      declarations: [ NgxRouteBreadcrumbsComponent ],
      providers: [{provide: NgxRouteBreadcrumbsService, useValue: {breadcrumbs: bc.asObservable()}}]
    })
    .overrideTemplate(NgxRouteBreadcrumbsComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(NgxRouteBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sub and unsub', () => {
    it('should be subscribed', () => {
      expect(bc.observers.length).toBe(1);
    });
    it('should be unsubscribed after ngOnDestroy', () => {
      expect(bc.observers.length).toBe(1);
      component.ngOnDestroy();
      expect(bc.observers.length).toBe(0);
    });
  });
});
