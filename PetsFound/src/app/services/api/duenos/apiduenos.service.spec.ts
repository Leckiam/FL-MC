import { TestBed } from '@angular/core/testing';

import { ApiduenosService } from './apiduenos.service';

describe('ApiduenosService', () => {
  let service: ApiduenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiduenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
