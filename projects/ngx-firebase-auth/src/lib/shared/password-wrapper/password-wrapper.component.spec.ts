import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordWrapperComponent } from './password-wrapper.component';

describe('PasswordWrapperComponent', () => {
  let component: PasswordWrapperComponent;
  let fixture: ComponentFixture<PasswordWrapperComponent>;

  let input: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    input = document.createElement('input');
    fixture = TestBed.createComponent(PasswordWrapperComponent);
    component = fixture.componentInstance;
    component.inputElementRef = {nativeElement: input};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterContentInit', () => {
    it('should set shown to false if the input type is password', () => {
      input.type = 'password';
      component.ngAfterContentInit();
      expect(component.shown).toBe(false);
    });
    it('should set shown to true if the input type is text', () => {
      input.type = 'text';
      component.ngAfterContentInit();
      expect(component.shown).toBe(true);
    });
  });

  describe('toggle()', () => {
    beforeEach(() => {
      input.type = 'password';
      component.ngAfterContentInit();
    });
    it('should toggle', () => {
      expect(component.shown).toBe(false);
      expect(input.type).toBe('password');
      component.toggle();
      expect(component.shown).toBe(true);
      expect(input.type).toBe('text');
      component.toggle();
      expect(component.shown).toBe(false);
      expect(input.type).toBe('password');
    });
  });
});
