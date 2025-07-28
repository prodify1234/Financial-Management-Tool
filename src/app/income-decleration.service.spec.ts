import { TestBed } from '@angular/core/testing';

import { IncomeDeclerationService } from './income-decleration.service';

describe('IncomeDeclerationService', () => {
  let service: IncomeDeclerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeDeclerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
