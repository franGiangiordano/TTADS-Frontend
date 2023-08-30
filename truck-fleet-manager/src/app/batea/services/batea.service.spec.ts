import { TestBed } from '@angular/core/testing';

import { BateaServiceService } from './batea.service';

describe('BateaServiceService', () => {
  let service: BateaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BateaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
