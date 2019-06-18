import { TestBed } from '@angular/core/testing';

import { NgxColorControlService } from './ngx-color-control.service';

describe('NgxColorControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxColorControlService = TestBed.get(NgxColorControlService);
    expect(service).toBeTruthy();
  });
});
