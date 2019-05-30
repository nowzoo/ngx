import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrumbsComponent } from './crumbs.component';
import { NgxCrumbsService } from '../ngx-crumbs.service';

describe('CrumbsComponent', () => {
  let component: CrumbsComponent;
  let fixture: ComponentFixture<CrumbsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CrumbsComponent ],
      providers: [
        {provide: NgxCrumbsService, useValue: { crumbs$: {}}}
      ]
    })
    .overrideTemplate(CrumbsComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(CrumbsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have crumbs$', () => {
    expect(component.crumbs$).toBeTruthy();
  });
});
