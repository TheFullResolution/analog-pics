/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { DeleteService } from './delete.service'

describe('Service: Delete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteService],
    })
  })

  it('should ...', inject([DeleteService], (service: DeleteService) => {
    expect(service).toBeTruthy()
  }))
})
