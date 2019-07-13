import { TestBed } from '@angular/core/testing';

import { NgxDateTimeService } from './ngx-date-time.service';

describe('NgxDateTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxDateTimeService = TestBed.get(NgxDateTimeService);
    expect(service).toBeTruthy();
  });
});
