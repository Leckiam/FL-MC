import { TestBed } from '@angular/core/testing';

import { FbmascotaService } from './fbmascota.service';

describe('FbmascotaService', () => {
  let service: FbmascotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbmascotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
