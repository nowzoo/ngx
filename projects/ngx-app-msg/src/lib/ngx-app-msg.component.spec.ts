import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NgxAppMsgService } from './ngx-app-msg.service';

import { NgxAppMsgComponent } from './ngx-app-msg.component';

describe('NgxAppMsgComponent', () => {
  let component: NgxAppMsgComponent;
  let fixture: ComponentFixture<NgxAppMsgComponent>;
  let subj$: BehaviorSubject<any>;
  let service;


  beforeEach(() => {
    subj$ = new BehaviorSubject(null);
    service = {messages$: subj$.asObservable()};
    TestBed.configureTestingModule({
      declarations: [ NgxAppMsgComponent ],
      providers: [{provide: NgxAppMsgService, useValue: service}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxAppMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe & unsub to the messages', () => {
    expect(subj$.observers.length).toBe(1);
    component.ngOnDestroy();
    expect(subj$.observers.length).toBe(0);
  });

  it('should set a timeout & if sent a message with autohide = true', () => {
    expect(component.hideTimeout).toEqual(null);
    subj$.next({autohide: true, message: 'foo', context: 'success'});
    expect(component.hideTimeout).not.toEqual(null);
  });

  it('should clear the timeout if sent another message', () => {
    expect(component.hideTimeout).toEqual(null);
    subj$.next({autohide: true, message: 'foo', context: 'success'});
    expect(component.hideTimeout).not.toEqual(null);
    subj$.next({autohide: false, message: 'foo', context: 'success'});
    expect(component.hideTimeout).toEqual(null);
  });

  it('should hide after the timeout', fakeAsync(() => {
    expect(component.shown).toBe(false);
    subj$.next({autohide: true, message: 'foo', context: 'success', modal: true, dismissible: true});
    expect(component.shown).toBe(true);
    tick(component.autohideAfter - 1);
    expect(component.shown).toBe(true);
    tick(1);
    expect(component.shown).toBe(false);
  }));

});
