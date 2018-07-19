import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { NgxFormErrorComponent } from './error.component';


describe('NgxFormErrorComponent', () => {
  let component: NgxFormErrorComponent;
  let fixture: ComponentFixture<NgxFormErrorComponent>;
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ NgxFormErrorComponent ],
      providers: []
    })
    .compileComponents();
    fixture = TestBed.createComponent(NgxFormErrorComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
