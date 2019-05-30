import { TestBed } from '@angular/core/testing';

import { NgxFireService } from './ngx-fire.service';

describe('NgxFireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFireService = TestBed.get(NgxFireService);
    expect(service).toBeTruthy();
  });
});
