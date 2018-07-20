import { TestBed, inject } from '@angular/core/testing';

import { NgxWindowTitleService } from './window-title.service';
import { Title } from '@angular/platform-browser';
import { NGX_WINDOW_TITLE_SEPARATOR } from './window-title-separator';
describe('NgxWindowTitleService', () => {

  let service: NgxWindowTitleService;
  let title;
  beforeEach(() => {
    title = {setTitle: jasmine.createSpy()};
    TestBed.configureTestingModule({
      providers: [
        NgxWindowTitleService,
        {provide: Title, useValue: title},
        {provide: NGX_WINDOW_TITLE_SEPARATOR, useValue: ' | '}
      ]
    });
    service = TestBed.get(NgxWindowTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should include both app and route titles if both are truthy', () => {
    service.appTitle = 'app';
    service.routeTitle = 'route';
    expect(service.fullTitle).toBe('route | app');
    expect(title.setTitle).toHaveBeenCalledWith(service.fullTitle);
    expect(service.appTitle).toBe('app');
    expect(service.routeTitle).toBe('route');
  });
  it('should include just the app title if only that is truthy', () => {
    service.appTitle = 'app';
    service.routeTitle = '';
    expect(service.fullTitle).toBe('app');
    expect(title.setTitle).toHaveBeenCalledWith(service.fullTitle);
    expect(service.appTitle).toBe('app');
    expect(service.routeTitle).toBe('');
  });
  it('should include just the route title if only that is truthy', () => {
    service.appTitle = '';
    service.routeTitle = 'route';
    expect(service.fullTitle).toBe('route');
    expect(title.setTitle).toHaveBeenCalledWith(service.fullTitle);
    expect(service.appTitle).toBe('');
    expect(service.routeTitle).toBe('route');
  });
});
