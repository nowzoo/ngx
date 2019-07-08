import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-fake',
  template: `
    <ng-template #fakeTemplate>Foo</ng-template>
  `,
  styles: [':host {display: none;}']
})
class FakeComponent {
  @ViewChild('fakeTemplate') fakeTemplate: TemplateRef<any>;
}

import { NgxBootstrapPopupPlaceholderComponent } from './ngx-bootstrap-popup-placeholder.component';

describe('NgxBootstrapPopupPlaceholderComponent', () => {
  let component: NgxBootstrapPopupPlaceholderComponent;
  let fixture: ComponentFixture<NgxBootstrapPopupPlaceholderComponent>;
  let fakeComponent: FakeComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBootstrapPopupPlaceholderComponent, FakeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBootstrapPopupPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fakeComponent = TestBed.createComponent(FakeComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have template', () => {

  });

  describe('set inserted', () => {
    it('should work with a string', () => {
      component.inserted = 'fooo';
      expect(component.template).toBe(component.defaultTemplate);
      expect(component.inserted).toBe('fooo');
    });
    it('should work if passed a TemplateRef', () => {
      const ref: TemplateRef<any> = fakeComponent.fakeTemplate;
      component.inserted = ref;
      expect(component.template).toBe(ref);
      expect(component.inserted).toBe(ref);
    });
  });
});
