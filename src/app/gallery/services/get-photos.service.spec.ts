/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { GetPhotosService } from './get-photos.service';

describe('Service: GetPhotos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPhotosService],
    });
  });

  it('should ...', inject([GetPhotosService], (service: GetPhotosService) => {
    expect(service).toBeTruthy();
  }));
});
