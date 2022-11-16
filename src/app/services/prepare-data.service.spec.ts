import { TestBed } from '@angular/core/testing';

import { PrepareDataService } from './prepare-data.service';

describe('PrepareDataService', () => {
  let service: PrepareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
