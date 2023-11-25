import { TestBed } from '@angular/core/testing';

import { FormsubService } from './formsub.service';

describe('FormsubService', () => {
  let service: FormsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
