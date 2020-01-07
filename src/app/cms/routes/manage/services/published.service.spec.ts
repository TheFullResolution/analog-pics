import { TestBed } from '@angular/core/testing';

import { PublishedService } from './published.service';

describe('PublishedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishedService = TestBed.get(PublishedService);
    expect(service).toBeTruthy();
  });
});
