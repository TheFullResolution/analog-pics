/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { SelectService } from './select.service'

describe('Service: Select', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectService]
    })
  })

  it('should ...', inject([SelectService], (service: SelectService) => {
    expect(service).toBeTruthy()
  }))
})
