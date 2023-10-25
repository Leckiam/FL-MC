import { TestBed } from '@angular/core/testing';

import { ApipetsService } from './apipets.service';

describe('ApipetsService', () => {
  let service: ApipetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApipetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
