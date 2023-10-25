import { TestBed } from '@angular/core/testing';

import { ApidogsService } from './apidogs.service';

describe('ApidogsService', () => {
  let service: ApidogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApidogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
