import { TestBed } from '@angular/core/testing';

import { BbddService } from './bbdd.service';

describe('BbddService', () => {
  let service: BbddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BbddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
