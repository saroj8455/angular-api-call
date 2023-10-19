import { TestBed } from '@angular/core/testing';

import { ErrorInteService } from './error-inte.service';

describe('ErrorInteService', () => {
  let service: ErrorInteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
