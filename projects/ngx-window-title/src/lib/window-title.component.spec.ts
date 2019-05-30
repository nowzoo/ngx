import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTitleComponent } from './window-title.component';
import { NgxWindowTitleService } from './ngx-window-title.service';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { WindowTitleContext } from './api';

describe('WindowTitleComponent', () => {
  let component: WindowTitleComponent;
  let fixture: ComponentFixture<WindowTitleComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTitleComponent ],
      providers: [
        {provide: NgxWindowTitleService, useValue: {}},
        {provide: Title, useValue: {}}
      ]
    })
    .overrideTemplate(WindowTitleComponent, '')
    .compileComponents();
    fixture = TestBed.createComponent(WindowTitleComponent);
    component = fixture.componentInstance;
    component.routeElementRef = {nativeElement: {}};
    component.appElementRef = {nativeElement: {}};
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have titleService', () => {
    expect(component.titleService).toBeTruthy();
  });
  it('should have service', () => {
    expect(component.service).toBeTruthy();
  });
  it('should have routeEl', () => {
    expect(component.routeEl).toBeTruthy();
  });
  it('should have appEl', () => {
    expect(component.appEl).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    let subj$: BehaviorSubject<any[]>;
    let updateTemplatesSpy: jasmine.Spy;
    beforeEach(() => {
      subj$ = new BehaviorSubject([]);
      spyOnProperty(component, 'service').and.returnValue({windowTitles$: subj$.asObservable()});
      updateTemplatesSpy = spyOn(component, 'updateTemplates').and.callFake(() => {});
    });
    it('should sub and unsub from the observable', () => {
      expect(subj$.observers.length).toBe(0);
      component.ngOnInit();
      expect(subj$.observers.length).toBe(1);
      component.ngOnDestroy();
      expect(subj$.observers.length).toBe(0);

    });
    it('should call component.updateTemplates(recs)', () => {
      expect(updateTemplatesSpy).not.toHaveBeenCalled();
      component.ngOnInit();
      expect(updateTemplatesSpy).toHaveBeenCalledWith(subj$.value);
      subj$.next([{}]);
      expect(updateTemplatesSpy).toHaveBeenCalledWith(subj$.value);
    });
  });

  describe('updateTemplates(recs: IWindowTitle[])', () => {

    it('should set appTemplate to null if no app templates exist', () => {
      const recs: any[] = [{context: WindowTitleContext.route, templateRef: {foo: 8}}];
      component.updateTemplates(recs);
      expect(component.appTemplate).toBe(null);
    });
    it('should set appTemplate to the template if an app template exists', () => {
      const recs: any[] = [
        {context: WindowTitleContext.app, templateRef: {foo: 8}},
        {context: WindowTitleContext.app, templateRef: {foo: 9}}
      ];
      component.updateTemplates(recs);
      expect(component.appTemplate).toEqual({foo: 9});
    });
    it('should set routeTemplate to null if no route templates exist', () => {
      const recs: any[] = [{context: WindowTitleContext.app, templateRef: {foo: 8}}];
      component.updateTemplates(recs);
      expect(component.routeTemplate).toBe(null);
    });
    it('should set routeTemplate to the template if a route template exists', () => {
      const recs: any[] = [
        {context: WindowTitleContext.route, templateRef: {foo: 8}},
        {context: WindowTitleContext.route, templateRef: {foo: 9}},
      ];
      component.updateTemplates(recs);
      expect(component.routeTemplate).toEqual({foo: 9});
    });
  });

  describe('onContentChange()', () => {
    let setTitleSpy: jasmine.Spy;
    let routeEl: any;
    let appEl: any;
    beforeEach(() => {
      setTitleSpy = jasmine.createSpy();
      spyOnProperty(component, 'titleService').and.returnValue({setTitle: setTitleSpy});
      routeEl = {innerText: 'foo'};
      spyOnProperty(component, 'routeEl').and.returnValue(routeEl);
      appEl = {innerText: 'bar'};
      spyOnProperty(component, 'appEl').and.returnValue(appEl);
    });
    it('should set title if both titles are non-empty strings', () => {
      component.onContentChange();
      expect(setTitleSpy).toHaveBeenCalledWith('foo | bar');
    });
    it('should set title if the route title is empty', () => {
      routeEl.innerText = '';
      component.onContentChange();
      expect(setTitleSpy).toHaveBeenCalledWith('bar');
    });
    it('should set title if the app title is empty', () => {
      appEl.innerText = '';
      component.onContentChange();
      expect(setTitleSpy).toHaveBeenCalledWith('foo');
    });
    it('should set title if appFirst is true', () => {
      component.appFirst = true;
      component.onContentChange();
      expect(setTitleSpy).toHaveBeenCalledWith('bar | foo');
    });
    it('should set title if passed another separator', () => {
      component.separator = '/';
      component.onContentChange();
      expect(setTitleSpy).toHaveBeenCalledWith('foo/bar');
    });
  });
});
