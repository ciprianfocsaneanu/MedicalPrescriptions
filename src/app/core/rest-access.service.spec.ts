import { TestBed } from '@angular/core/testing';

import { RestAccessService } from './rest-access.service';

describe('RestAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAccessService = TestBed.get(RestAccessService);
    expect(service).toBeTruthy();
  });
});
