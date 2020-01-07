/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { PublishService } from './publish.service';

describe('Service: Publish', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublishService],
    });
  });

  it('should ...', inject([PublishService], (service: PublishService) => {
    expect(service).toBeTruthy();
  }));
});
