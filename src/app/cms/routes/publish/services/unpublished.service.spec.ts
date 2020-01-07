import { TestBed } from '@angular/core/testing';

import { UnpublishedService } from './unpublished.service';

describe('UnpublishedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnpublishedService = TestBed.get(UnpublishedService);
    expect(service).toBeTruthy();
  });
});
