import { TestBed } from '@angular/core/testing';

import { FinancialItemsService } from './financial-items.service';

describe('FinancialItemsService', () => {
  let service: FinancialItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
