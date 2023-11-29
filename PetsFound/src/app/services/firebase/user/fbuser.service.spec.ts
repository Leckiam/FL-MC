import { TestBed } from '@angular/core/testing';

import { FbuserService } from './fbuser.service';

describe('FbuserService', () => {
  let service: FbuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
