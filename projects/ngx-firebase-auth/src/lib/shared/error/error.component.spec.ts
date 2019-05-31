import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.error = {code: 'a', message: 'foo'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the error message for ngx-firebase-auth/sign-in-required', () => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.error = {code: 'a', message: 'foo'};
    component.error = {code: 'ngx-firebase-auth/sign-in-required', message: 'foo'};
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('foo');
  });
});
