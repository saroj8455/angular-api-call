import { TestBed } from '@angular/core/testing';

import { SearchCdnService } from './search-cdn.service';

describe('SearchCdnService', () => {
  let service: SearchCdnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCdnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
