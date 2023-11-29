import { TestBed } from '@angular/core/testing';

import { FbduenoService } from './fbdueno.service';

describe('FbduenoService', () => {
  let service: FbduenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbduenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
