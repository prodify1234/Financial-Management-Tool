import { TestBed } from '@angular/core/testing';

import { AssetDeclerationService } from './services/asset-decleration.service';

describe('AssetDeclerationService', () => {
  let service: AssetDeclerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDeclerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
