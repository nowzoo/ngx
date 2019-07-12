import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarModalComponent } from './calendar-modal.component';
import { NgxBootstrapModalService } from '@nowzoo/ngx-bootstrap-modal';

describe('CalendarModalComponent', () => {
  let component: CalendarModalComponent;
  let fixture: ComponentFixture<CalendarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarModalComponent ],
      providers: [
        { provide: NgxBootstrapModalService, useValue: {}}
      ]
    })
    .overrideTemplate(CalendarModalComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get modalService()', () => {
    it('should have modalService', () => {
      expect(component.modalService).toBeTruthy();
    });

    describe('show()', () => {
      it('should call modalS.show with the template', () => {
        component.modalTemplate = {} as any;
        spyOnProperty(component, 'modalService').and.returnValue({
          show: jasmine.createSpy()
        });
        component.show();
        expect(component.modalService.show).toHaveBeenCalledWith(component.modalTemplate);
      });
    });
    describe('onMonthChanged()', () => {
      it('should call handleUpdate on the modal', () => {
        component.modalInstance = { handleUpdate: jasmine.createSpy() } as any;
        component.onMonthChanged();
        expect(component.modalInstance.handleUpdate).toHaveBeenCalledWith();
      });
    });

    describe('setSelected(s: string)', () => {
      it('should close the modal', () => {
        component.modalInstance = { hide: jasmine.createSpy() } as any;
        component.setSelected('2000-01-01');
        expect(component.modalInstance.hide).toHaveBeenCalledWith();
      });
      it('should emit', () => {
        component.modalInstance = { hide: jasmine.createSpy() } as any;
        spyOn(component.selectedChange, 'emit').and.callThrough();
        component.setSelected('2000-01-01');
        expect(component.selectedChange.emit).toHaveBeenCalledWith('2000-01-01');
      });
    });
  });
});
