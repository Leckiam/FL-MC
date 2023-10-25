import { TestBed } from '@angular/core/testing';

import { ApiusersService } from './apiusers.service';

describe('ApiusersService', () => {
  let service: ApiusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
